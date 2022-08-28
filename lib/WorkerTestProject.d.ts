import { BaseTestProject, LocalContext, TestCaseFunction } from "@katalon-g5/engine";
declare type ResolveType = (value: boolean) => void;
declare type RejectType = (error: unknown) => void;
export declare class WorkerTestProject extends BaseTestProject {
    targetSteps?: {
        from: number;
        to: number;
    };
    currentStep?: {
        stepIndex: number;
        resolve: ResolveType;
        reject: RejectType;
    };
    testCase<LocalType extends LocalContext>(name: string, fn: TestCaseFunction<LocalType>): Promise<import("@katalon-g5/engine").TestCaseInfo<LocalType>>;
    shouldRunThisStep(stepIndex: number): boolean | null;
    debugger(stepIndex: number): Promise<boolean>;
    startDevServer(): Promise<void>;
}
export {};
