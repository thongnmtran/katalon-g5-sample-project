"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerTestProject = void 0;
const engine_1 = require("@katalon-g5/engine");
const common_messaging_1 = require("@katalon-g5/common-messaging");
const common_models_1 = require("@katalon-g5/common-models");
class WorkerTestProject extends engine_1.BaseTestProject {
    targetSteps;
    currentStep;
    async testCase(name, fn) {
        this.startDevServer();
        return super.testCase(name, fn);
    }
    shouldRunThisStep(stepIndex) {
        if (!this.targetSteps) {
            return null;
        }
        const shouldSkip = this.targetSteps.from >= 0 && stepIndex < this.targetSteps.from;
        if (shouldSkip) {
            return false;
        }
        const isInRunRange = this.targetSteps.from <= stepIndex && stepIndex <= this.targetSteps.to;
        return isInRunRange ? true : null; // Null mean wait to run
    }
    debugger(stepIndex) {
        const shouldRunThisStep = this.shouldRunThisStep(stepIndex);
        if (shouldRunThisStep != null) {
            return Promise.resolve(shouldRunThisStep);
        }
        const promise = new Promise((resolve, reject) => {
            this.currentStep = {
                stepIndex: stepIndex,
                resolve,
                reject,
            };
        });
        return promise;
    }
    async startDevServer() {
        const transporter = common_messaging_1.TransporterFactory.SynchronousWorkerClient();
        transporter.connect();
        transporter.addRequestListener((request) => {
            if (request.id === common_messaging_1.VOLATIVE_MESSAGE_ID) {
                const message = request.data;
                switch (message.messageType) {
                    case common_models_1.ExecutionMessageType.START:
                        {
                            const targetSteps = message.content;
                            this.targetSteps = {
                                from: targetSteps.from,
                                to: targetSteps.to,
                            };
                            if (!this.currentStep) {
                                return;
                            }
                            const shouldRunThisStep = this.shouldRunThisStep(this.currentStep.stepIndex);
                            if (shouldRunThisStep != null) {
                                this.currentStep.resolve(shouldRunThisStep);
                            }
                        }
                        break;
                    case common_models_1.ExecutionMessageType.STOP:
                        this.notifyComplete();
                        break;
                    default:
                        break;
                }
            }
        });
    }
}
exports.WorkerTestProject = WorkerTestProject;
//# sourceMappingURL=WorkerTestProject.js.map