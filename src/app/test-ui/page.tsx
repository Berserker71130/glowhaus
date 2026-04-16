"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Rating } from "@/components/ui/Ratings";
import { GoldDivider } from "@/components/ui/Divider";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/Modal"; // Added the new exports here
import {
  Checkbox,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/FormExtras";
import { useState } from "react";

export default function UITestPage() {
  const [rating, setRating] = useState(3);

  return (
    <main className="p-10 bg-ivory min-h-screen space-y-12">
      <h1 className="text-4xl font-bold text-noir border-b-2 border-gold pb-2">
        GlowHaus UI Library Test
      </h1>

      {/* 1. BUTTONS */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. Button Variants</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary Gold</Button>
          <Button variant="outline">Outline Gold</Button>
          <Button variant="ghost">Ghost Learn More</Button>
          <Button variant="dark">Dark Noir</Button>
          <Button variant="icon" className="rounded-full">
            ❤
          </Button>
        </div>
      </section>

      {/* 2. BADGES */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2. Badge Variants</h2>
        <div className="flex gap-4">
          <Badge variant="new">NEW</Badge>
          <Badge variant="bestseller">BESTSELLER</Badge>
          <Badge variant="sale">SALE</Badge>
          <Badge variant="lowstock">LOW STOCK</Badge>
          <Badge variant="soldout">SOLD OUT</Badge>
        </div>
      </section>

      <GoldDivider />

      {/* 3. FORMS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">3. Inputs & Checkbox</h2>
          <Input placeholder="Enter your luxury email..." />
          <div className="flex items-center gap-2 mt-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm">
              Accept Terms
            </label>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">4. Rating (Interactive)</h2>
          <Rating value={rating} interactive onChange={setRating} />
          <p className="text-xs text-taupe">
            Current Selection: {rating} Stars
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            8. Radix Select (Gold Chevron)
          </h2>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a House Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maitama">Maitama Mansion</SelectItem>
              <SelectItem value="gwarinpa">Gwarinpa Flat</SelectItem>
              <SelectItem value="wuse">Wuse 2 Office</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* 4. TABS & ACCORDION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">5. Tabs (Pill Variant)</h2>
          <Tabs defaultValue="desc">
            <TabsList>
              <TabsTrigger value="desc" variant="pill">
                Description
              </TabsTrigger>
              <TabsTrigger value="specs" variant="pill">
                Specs
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="desc"
              className="p-4 bg-white rounded-lg shadow-sm"
            >
              Luxury skincare for the elite.
            </TabsContent>
            <TabsContent
              value="specs"
              className="p-4 bg-white rounded-lg shadow-sm"
            >
              Organic, Gold-infused, 50ml.
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">6. Accordion (FAQ)</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is this shipping to Jos?</AccordionTrigger>
              <AccordionContent>
                Yes, we deliver luxury to the Plateau!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 5. MODAL TEST - NOW ACCESSIBLE */}
      <section className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gold/30 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          7. The Modal Test
        </h2>
        <Modal>
          <ModalTrigger asChild>
            <Button variant="dark">Open Luxury Modal</Button>
          </ModalTrigger>
          <ModalContent>
            {/* Swapped <h3> and <p> for the Radix components to stop the error */}
            <ModalTitle className="text-2xl font-bold">
              Welcome to GlowHaus
            </ModalTitle>
            <ModalDescription className="text-taupe mb-6">
              This is the blurred overlay modal we built with accessible
              primitives.
            </ModalDescription>
            <Button variant="primary" className="w-full">
              Get Started
            </Button>
          </ModalContent>
        </Modal>
      </section>
    </main>
  );
}
