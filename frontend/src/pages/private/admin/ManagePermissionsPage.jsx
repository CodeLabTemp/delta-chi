import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import PendingApplicantCard from "@/components/admin/manage-permissions/PendingApplicantCard";
import BannedMembers from "@/components/admin/manage-permissions/BannedMembers";
import CurrentMembers from "@/components/admin/manage-permissions/CurrentMembers";
import PendingApplicants from "@/components/admin/manage-permissions/PendingApplicants";

const ManagePermissions = () => {
  return (
    <div className="w-full mt-4">
      <h1 className="text-3xl font-bold mb-10 text-center font-merriweather text-[#CA3D31]">
        Member Management
      </h1>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-2 bg-white shadow-none border-none ring-0">
          <TabsTrigger
            value="pending"
            className="py-2 px-4 text-lg font-merriweather bg-white text-black border-none rounded-none w-auto focus:outline-none focus:ring-0 shadow-none relative 
            data-[state=active]:text-[#CA3D31] data-[state=active]:after:content-[''] 
            data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 
            data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#CA3D31]"
          >
            Pending Applicants
          </TabsTrigger>
          <TabsTrigger
            value="current"
            className="py-2 px-4 text-lg font-merriweather bg-white text-black border-none rounded-none w-auto focus:outline-none focus:ring-0 shadow-none relative 
            data-[state=active]:text-[#CA3D31] data-[state=active]:after:content-[''] 
            data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 
            data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#CA3D31]"
          >
            Current Members
          </TabsTrigger>
          <TabsTrigger
            value="banned"
            className="py-2 px-4 text-lg font-merriweather bg-white text-black border-none rounded-none w-auto focus:outline-none focus:ring-0 shadow-none relative 
            data-[state=active]:text-[#CA3D31] data-[state=active]:after:content-[''] 
            data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 
            data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#CA3D31]"
          >
            Update Banned/Rejected Members
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <PendingApplicants />
        </TabsContent>
        <TabsContent value="current" className="max-[765px]:pt-6">
          <CurrentMembers />
        </TabsContent>
        <TabsContent value="banned">
          <BannedMembers />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManagePermissions;
