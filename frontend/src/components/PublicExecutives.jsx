export default function PublicExecutives({ executives }) {
    return (
      <div className="bg-[#F5F5DC] py-8 w-full overflow-hidden">
        <h1 className="text-[#CA3D31] font-lora font-bold text-3xl mb-12 text-center">
          Executive Board
        </h1>
  
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-screen-xl mx-auto gap-y-12 gap-x-8 px-4">
          {executives.length === 0 ? (
            <p className="text-center text-xl">No executives available.</p>
          ) : (
            executives.map((executive) => (
              <div
                className="flex flex-col items-center"
                key={executive.memberName}
              >
                <img
                  src={executive.memberImage}
                  alt={executive.memberName}
                  className="w-56 h-56 rounded-full object-cover mt-4 mb-6"
                />
                <h2 className="font-lora font-semibold text-xl mt-4">
                  {executive.memberName}
                </h2>
                <p className="font-lora text-md mt-1 mb-4 text-gray-600">
                  {executive.memberRank}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
  