export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#0a1f44] mb-4">Recover Password</h1>
        <p className="text-gray-600 mb-4">Enter your email and we go send recovery link</p>
        <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg mb-3" />
        <button className="w-full bg-[#ec4899] text-white p-3 rounded-lg font-bold">Send Recovery Email</button>
      </div>
    </div>
  );
}
