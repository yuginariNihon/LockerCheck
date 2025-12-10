import z from "zod";

export interface LockerStats{
  total: number;
  used: number;
  free: number;
  checked: number;
  notCheck: number;
  totalShoe: number;
  useShoe: number;
  freeShoe: number;
}

export interface LockerType {
    lockerUserData_ID: string;
    locker_ID: String;
    locker_Number: String;
    member_ID: String;
    name_Lastname : String;
    active_status: boolean;
}

export interface LockerReportType {
    lockerNumber: string;
    member_ID: String;
    name_Lastname : String;
    lockerLogResult : string;
    corective_action : string;
    remark: string;
    inspector : string;
    date_check : string;
}

export interface LockerShoesDataType {
  shoeLockerId: string;
  shoesLockerNumber: string;
  memberIdFirst: string;
  nameLastNameFirst: string;
  memberIdSecound: string;
  nameLastNameSecound: string;
  shoestatus: boolean;
}

export const LockerShoesSchema = z.object({
  shoeLocker_Id: z.string(),
  shoesLocker_Number: z.string(),
  member_IdFirst: z.string(),
  nameLastNameFirst: z.string(),
  member_IdSecound: z.string(),
  nameLastNameSecound: z.string(),
  shoe_status: z.boolean(),
}).superRefine((data, ctx) => {
  const nftRegex = /^NFT\d{8}$/;

  // --- member_IdFirst ---
  if (data.member_IdFirst && !nftRegex.test(data.member_IdFirst)) {
    ctx.addIssue({
      path: ["member_IdFirst"],
      message: "Format Employee ID : NFT00000000",
      code: z.ZodIssueCode.custom,
    });
  }

  // Name-Lastname First ต้องกรอกได้ก็ต่อเมื่อ ID มีค่า
  if (data.nameLastNameFirst && !data.member_IdFirst) {
    ctx.addIssue({
      path: ["member_IdFirst"],
      message: "Please enter Employee ID before Name",
      code: z.ZodIssueCode.custom,
    });
  }

  // เพิ่มเงื่อนไข: ถ้า ID มีค่า แต่ Name ว่าง → error
  if (data.member_IdFirst && !data.nameLastNameFirst) {
    ctx.addIssue({
      path: ["nameLastNameFirst"],
      message: "Please enter your Name",
      code: z.ZodIssueCode.custom,
    });
  }

  // --- member_IdSecound ---
  if (data.member_IdSecound && !nftRegex.test(data.member_IdSecound)) {
    ctx.addIssue({
      path: ["member_IdSecound"],
      message: "Format Employee ID : NFT00000000",
      code: z.ZodIssueCode.custom,
    });
  }

  // Name-Lastname Second ต้องกรอกได้ก็ต่อเมื่อ ID มีค่า
  if (data.nameLastNameSecound && !data.member_IdSecound) {
    ctx.addIssue({
      path: ["member_IdSecound"],
      message: "Please enter Employee ID before Name",
      code: z.ZodIssueCode.custom,
    });
  }

  // เพิ่มเงื่อนไข: ถ้า ID มีค่า แต่ Name ว่าง → error
  if (data.member_IdSecound && !data.nameLastNameSecound) {
    ctx.addIssue({
      path: ["nameLastNameSecound"],
      message: "Please enter your Name",
      code: z.ZodIssueCode.custom,
    });
  }
});

export const LockerSchema = z.object({
  locker_User_ID: z.string().min(1, "Locker User ID is required"),
  member_ID: z.string(),
  name_Lastname: z.string(),
  active_status: z.boolean(),
}).superRefine((data, ctx) => {
  const nftRegex = /^NFT\d{8}$/;

  // ตรวจ Member ID format
  if (data.member_ID && !nftRegex.test(data.member_ID)) {
    ctx.addIssue({
      path: ["member_ID"],
      message: "Format Employee ID : NFT00000000",
      code: z.ZodIssueCode.custom,
    });
  }

  // ถ้า Name มีค่า แต่ Member ID ว่าง → error
  if (data.name_Lastname && !data.member_ID) {
    ctx.addIssue({
      path: ["member_ID"],
      message: "Please enter Employee ID before Name",
      code: z.ZodIssueCode.custom,
    });
  }

  // ถ้า Member ID มีค่า แต่ Name ว่าง → สามารถบังคับได้ถ้าต้องการ
  // ตัวอย่าง: ถ้าอยากให้กรอก Name เมื่อมี ID
  if (data.member_ID && !data.name_Lastname) {
    ctx.addIssue({
      path: ["name_Lastname"],
      message: "Please enter your Name",
      code: z.ZodIssueCode.custom,
    });
  }
});

export const loginSchema = z.object({
  email: z.string().min(1,"Incorrect Email"),
  password: z.string().min(4, "Password too short"),
});