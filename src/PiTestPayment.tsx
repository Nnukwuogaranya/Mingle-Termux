import React, { useState } from "react";

interface PiPayment {
  identifier?: string;
  status?: unknown;
}

interface PiSDKWithPayments {
  createPayment: (
    paymentData: {
      amount: number;
      memo: string;
      metadata: Record<string, unknown>;
    },
    callbacks: {
      onReadyForServerApproval: (
        paymentId: string
      ) => void | Promise<void>;

      onReadyForServerCompletion: (
        paymentId: string,
        txid: string
      ) => void | Promise<void>;

      onCancel: (
        paymentId: string
      ) => void;

      onError: (
        error: Error,
        payment?: PiPayment
      ) => void;
    }
  ) => Promise<PiPayment> | void;
}

export default function PiTestPayment() {
  const [status, setStatus] = useState(
    "Ready for Pi test payment."
  );

  const [processing, setProcessing] =
    useState(false);

  const makeTestPayment = async () => {
    if (!window.Pi) {
      alert(
        "Pi SDK is not available. Please open Mingle in Pi Browser."
      );
      return;
    }

    /*
     * IMPORTANT:
     * App.tsx already owns the global PiSDK definition.
     *
     * We deliberately do NOT redeclare window.Pi here.
     *
     * This local extended type only adds createPayment.
     */
    const pi =
      window.Pi as unknown as PiSDKWithPayments;

    setProcessing(true);
    setStatus("Opening Pi payment...");

    try {
      await pi.createPayment(
        {
          amount: 0.1,

          memo:
            "Mingle Testnet App Verification",

          metadata: {
            purpose:
              "pi-developer-portal-test",

            app: "Mingle",
          },
        },

        {
          /*
           * SERVER APPROVAL
           */
          onReadyForServerApproval: async (
            paymentId: string
          ) => {
            console.log(
              "Pi payment approval:",
              paymentId
            );

            setStatus(
              "Payment created. Waiting for Pi approval..."
            );

            try {
              const response =
                await fetch(
                  "/api/pi/approve",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body:
                      JSON.stringify({
                        paymentId,
                      }),
                  }
                );

              const result =
                await response.json();

              if (
                !response.ok ||
                !result.success
              ) {
                throw new Error(
                  result.error ||
                    "Pi payment approval failed."
                );
              }

              setStatus(
                "Payment approved. Complete it in Pi."
              );
            } catch (error) {
              console.error(
                "Approval error:",
                error
              );

              setStatus(
                "Payment approval failed."
              );

              alert(
                error instanceof Error
                  ? error.message
                  : "Payment approval failed."
              );

              setProcessing(false);
            }
          },

          /*
           * SERVER COMPLETION
           */
          onReadyForServerCompletion:
            async (
              paymentId: string,
              txid: string
            ) => {
              console.log(
                "Pi payment completion:",
                paymentId,
                txid
              );

              setStatus(
                "Transaction submitted. Completing with Pi..."
              );

              try {
                const response =
                  await fetch(
                    "/api/pi/complete",
                    {
                      method: "POST",

                      headers: {
                        "Content-Type":
                          "application/json",
                      },

                      body:
                        JSON.stringify({
                          paymentId,
                          txid,
                        }),
                    }
                  );

                const result =
                  await response.json();

                if (
                  !response.ok ||
                  !result.success
                ) {
                  throw new Error(
                    result.error ||
                      "Pi payment completion failed."
                  );
                }

                setStatus(
                  "Pi test payment completed successfully."
                );

                alert(
                  "Pi test payment completed successfully."
                );
              } catch (error) {
                console.error(
                  "Completion error:",
                  error
                );

                setStatus(
                  "Transaction submitted, but completion failed."
                );

                alert(
                  error instanceof Error
                    ? error.message
                    : "Payment completion failed."
                );
              } finally {
                setProcessing(false);
              }
            },

          /*
           * USER CANCELLED
           */
          onCancel: (
            paymentId: string
          ) => {
            console.log(
              "Pi payment cancelled:",
              paymentId
            );

            setStatus(
              "Payment cancelled."
            );

            setProcessing(false);
          },

          /*
           * PAYMENT ERROR
           */
          onError: (
            error: Error,
            payment?: PiPayment
          ) => {
            console.error(
              "Pi payment error:",
              error,
              payment
            );

            setStatus(
              "Pi payment failed."
            );

            alert(
              error?.message ||
                "Pi payment failed."
            );

            setProcessing(false);
          },
        }
      );
    } catch (error) {
      console.error(
        "Pi.createPayment error:",
        error
      );

      setStatus(
        "Unable to start Pi payment."
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to start Pi payment."
      );

      setProcessing(false);
    }
  };

  return (
    <section
      style={{
        margin: "20px auto",
        maxWidth: "520px",
        padding: "18px",
        borderRadius: "18px",
        background:
          "rgba(255,255,255,0.88)",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.12)",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        Mingle Pi Test
      </h3>

      <p
        style={{
          fontSize: "14px",
          opacity: 0.75,
        }}
      >
        {status}
      </p>

      <button
        type="button"
        onClick={makeTestPayment}
        disabled={processing}
        style={{
          padding: "12px 22px",
          border: 0,
          borderRadius: "12px",
          cursor: processing
            ? "wait"
            : "pointer",
          fontWeight: 700,
        }}
      >
        {processing
          ? "PROCESSING..."
          : "PAY 0.1 π TESTNET"}
      </button>
    </section>
  );
}
