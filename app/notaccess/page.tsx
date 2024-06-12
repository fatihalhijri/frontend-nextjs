'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NotAccessPage = () => {
  const {data:session,status} = useSession()
  const router = useRouter();

  const handleBack = () => {
    if (session?.user.role === 'admin') {
      router.push('/admin');
    } else if (session?.user.role === 'peminjam') {
      router.push('/peminjam');
    } else if (session?.user.role === 'petugas') {
      router.push('/petugas');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
    <div className="max-w-lg w-full text-center md:bg-white rounded-lg md:shadow-lg p-8">
      <Image 
        src="/notaccess.png" // Sesuaikan dengan path gambar Anda
        alt="Access Denied"
        width={400}
        height={300}
        className="mx-auto"
      />
      <h1 className="text-4xl font-bold mt-4 text-gray-800">Not Access Page</h1>
      <p className="text-lg text-gray-600 mt-2">
        You do not have permission to access this page.
      </p>
      <div className="py-5">

      <button
          onClick={handleBack}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
          Go Back
        </button>
          </div>
    </div>
  </div>
  );
};

export default NotAccessPage;