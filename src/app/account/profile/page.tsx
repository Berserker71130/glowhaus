"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import PersonalInfo from "./PersonalInfo";
import Addresses from "./Addresses";
import Notifications from "./Notifications";
import Security from "./Security";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-noir">Account Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information, addresses and security preferences.
        </p>
      </div>

      {/* Tabs Container */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="bg-transparent border-b border-blush/20 w-full justify-start rounded-none p-0 h-auto space-x-8 mb-8">
          <TabsTrigger
            value="personal"
            className="px-0 pb-4 rounded-none text-base"
          >
            Personal Info
          </TabsTrigger>
          <TabsTrigger
            value="addresses"
            className="px-0 pb-4 rounded-none text-base"
          >
            Addresses
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="px-0 pb-4 rounded-none text-base"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="px-0 pb-4 rounded-none text-base"
          >
            Security
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <TabsContent value="personal">
          <PersonalInfo />
        </TabsContent>
        <TabsContent value="addresses">
          <Addresses />
        </TabsContent>
        <TabsContent value="notifications">
          <Notifications />
        </TabsContent>
        <TabsContent value="security">
          <Security />
        </TabsContent>
      </Tabs>
    </div>
  );
}
