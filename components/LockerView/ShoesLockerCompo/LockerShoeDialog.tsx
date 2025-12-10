'use client';
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogClose, DialogContent, DialogFooter,
  DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LockerShoesSchema } from "@/app/Type/type";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LockerDialog({
  open,
  setOpen,
  formShoe,
  loading,
  selectedLockerShoe,
  onSubmit,
}: any) {
  if (!selectedLockerShoe) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-800 text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle>#{selectedLockerShoe.shoesLockerNumber}</DialogTitle>
        </DialogHeader>

        <Form {...formShoe}>
          <form onSubmit={formShoe.handleSubmit(onSubmit)} className="space-y-4">

            {/* Hidden field */}
            <FormField
              control={formShoe.control}
              name="shoeLocker_Id"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

           
            <div className="flex flex-col gap-3 border-3 border-gray-900 rounded-sm p-3">
              {/* Member ID */}
              <p className="bg-gray-900 p-1 rounded-md h-full font-bold">First Employee</p>
              <FormField
                control={formShoe.control}
                name="member_IdFirst"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Employee ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Name */}
              <FormField
                control={formShoe.control}
                name="nameLastNameFirst"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name - Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-3 border-3 border-gray-900 rounded-sm p-3">
              <p className="bg-gray-900 p-1 rounded-md h-full font-bold">Second Employee</p>

              <FormField
                control={formShoe.control}
                name="member_IdSecound"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Employee ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Name */}
              <FormField
                control={formShoe.control}
                name="nameLastNameSecound"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name - Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Status Toggle */}
            <FormField
              control={formShoe.control}
              name="shoe_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active Status</FormLabel>
                  <FormControl>
                    <Button
                      type="button"
                      onClick={() => field.onChange(!field.value)}
                      className={`w-full ${
                        field.value
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {field.value ? "Set Empty" : "Set In Use"}
                    </Button>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="bg-blue-600 border-0">Close</Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Change"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
