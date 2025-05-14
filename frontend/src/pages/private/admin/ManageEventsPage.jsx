import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateEvent from "@/components/admin/manage-events/CreateEvent";
import ViewEvents from "@/components/admin/manage-events/ViewEvents";

const ManageEvents = () => {
  return (
    <div className="w-full mt-4">

      <h1 className="text-3xl font-bold mb-10 text-center font-merriweather text-[#CA3D31]">
        Events
      </h1>

      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-2 bg-white shadow-none border-none ring-0">
          <TabsTrigger
            value="manage"
            className="py-2 px-4 text-lg font-merriweather bg-white text-black border-none rounded-none w-auto focus:outline-none focus:ring-0 shadow-none relative 
            data-[state=active]:text-[#CA3D31] data-[state=active]:after:content-[''] 
            data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 
            data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#CA3D31]"
          >
            Manage Events
          </TabsTrigger>
          <TabsTrigger
            value="create"
            className="py-2 px-4 text-lg font-merriweather bg-white text-black border-none rounded-none w-auto focus:outline-none focus:ring-0 shadow-none relative 
            data-[state=active]:text-[#CA3D31] data-[state=active]:after:content-[''] 
            data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 
            data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#CA3D31]"
          >
            Create Event
          </TabsTrigger>
        </TabsList>
        <TabsContent value="manage">
          <ViewEvents />
        </TabsContent>
        <TabsContent value="create">
          <CreateEvent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageEvents;
