import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgroundbuku.png')" }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Tentang Kami</h1>
          <p className="text-xl text-gray-600">
          Kami bersemangat untuk memberikan layanan dan produk terbaik kepada pelanggan kami. Tim kami berusaha mencapai keunggulan dalam setiap proyek.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image
              src="/profile.png"
              alt="Our Team"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Misi Kami</h2>
            <p className="text-lg text-gray-600 mb-6">
            misi kami adalah menciptakan nilai melalui inovasi dan dedikasi. Kami berkomitmen untuk mencapai keunggulan dan terus meningkatkan layanan kami.
            </p>
            {/* <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600">
              Our team consists of experts in various fields, working together to achieve our common goals. We are always ready to go the extra mile for our customers.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
