import { create } from "zustand";
import { LockerStats } from "../Type/type";

type ReportState = {
    reportData: LockerStats | null;
    setReportData : (data: LockerStats) => void;
};

type CompareState = {
    monthlyCheckedPASS : number;
    monthlyCheckedNOTPASS : number;
    setMonthlyCheckedPASS : (data : number) => void;
    setMonthlyCheckedNOTPASS : (data : number) => void;
}

export const useReportStore = create<ReportState>((set) => ({
    reportData: null,
    setReportData: (data) => set({reportData : data}),
}));

export const useCompareStore = create<CompareState>((set) => ({
    monthlyCheckedPASS : 0,
    monthlyCheckedNOTPASS: 0,
    setMonthlyCheckedPASS: (data) => set({ monthlyCheckedPASS: data }),
    setMonthlyCheckedNOTPASS: (data) => set({ monthlyCheckedNOTPASS: data }),
}));