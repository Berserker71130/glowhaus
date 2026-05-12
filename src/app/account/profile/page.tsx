"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import PersonalInfo from "./PersonalInfo";
import Addresses from "./Addresses";
import Notifications from "./Notifications";
import Security from "./Security";

export default function SettingsPage() {
  return (
    /* SURGERY: Added transition-colors to ensure smooth theme switching */
    <div className="max-w-4xl mx-auto py-8 px-4 transition-colors duration-500">
      {/* Header Section */}
      <div className="mb-8">
        {/* FIX: text-noir -> dark:text-ivory */}
        <h1 className="text-3xl font-serif text-noir dark:text-ivory transition-colors">
          Account Settings
        </h1>
        {/* FIX: text-muted-foreground -> dark:text-ivory/40 */}
        <p className="text-muted-foreground dark:text-ivory/40 mt-2 transition-colors">
          Manage your personal information, addresses and security preferences.
        </p>
      </div>

      {/* Tabs Container */}
      <Tabs defaultValue="personal" className="w-full">
        {/* FIX: Border color updated for dark mode visibility */}
        <TabsList className="bg-transparent border-b border-blush/20 dark:border-white/10 w-full justify-start rounded-none p-0 h-auto space-x-8 mb-8 transition-colors">
          <TabsTrigger
            value="personal"
            /* FIX: Added dark mode text and state colors */
            className="px-0 pb-4 rounded-none text-base text-noir/60 dark:text-ivory/40 data-[state=active]:text-noir dark:data-[state=active]:text-ivory data-[state=active]:border-b-2 data-[state=active]:border-gold transition-all bg-transparent"
          >
            Personal Info
          </TabsTrigger>
          <TabsTrigger
            value="addresses"
            className="px-0 pb-4 rounded-none text-base text-noir/60 dark:text-ivory/40 data-[state=active]:text-noir dark:data-[state=active]:text-ivory data-[state=active]:border-b-2 data-[state=active]:border-gold transition-all bg-transparent"
          >
            Addresses
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="px-0 pb-4 rounded-none text-base text-noir/60 dark:text-ivory/40 data-[state=active]:text-noir dark:data-[state=active]:text-ivory data-[state=active]:border-b-2 data-[state=active]:border-gold transition-all bg-transparent"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="px-0 pb-4 rounded-none text-base text-noir/60 dark:text-ivory/40 data-[state=active]:text-noir dark:data-[state=active]:text-ivory data-[state=active]:border-b-2 data-[state=active]:border-gold transition-all bg-transparent"
          >
            Security
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <div className="mt-4">
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
        </div>
      </Tabs>
    </div>
  );
}
