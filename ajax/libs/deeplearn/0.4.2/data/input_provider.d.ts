import { NDArrayMath } from '../math/math';
import { NDArray } from '../math/ndarray';
export interface InputProvider {
    getNextCopy(math: NDArrayMath): NDArray;
    disposeCopy(math: NDArrayMath, copy: NDArray): void;
}
export interface ShuffledInputProviderBuilder {
    getInputProviders(): InputProvider[];
}
export declare abstract class InMemoryShuffledInputProviderBuilder implements ShuffledInputProviderBuilder {
    protected inputs: NDArray[][];
    protected shuffledIndices: Uint32Array;
    protected numInputs: number;
    protected idx: number;
    protected inputCounter: number;
    protected epoch: number;
    constructor(inputs: NDArray[][]);
    protected getCurrentExampleIndex(): number;
    protected getNextInput(inputId: number): NDArray;
    getEpoch(): number;
    getInputProviders(): InputProvider[];
    abstract getInputProvider(inputId: number): InputProvider;
}
export declare class InCPUMemoryShuffledInputProviderBuilder extends InMemoryShuffledInputProviderBuilder {
    getInputProvider(inputId: number): {
        getNextCopy(math: NDArrayMath): NDArray<"float32" | "int32" | "bool", "0" | "1" | "2" | "3" | "4" | "higher">;
        disposeCopy(math: NDArrayMath, copy: NDArray<"float32" | "int32" | "bool", "0" | "1" | "2" | "3" | "4" | "higher">): void;
    };
}
export declare class InGPUMemoryShuffledInputProviderBuilder extends InMemoryShuffledInputProviderBuilder {
    getInputProvider(inputId: number): {
        getNextCopy(math: NDArrayMath): NDArray<"float32" | "int32" | "bool", "0" | "1" | "2" | "3" | "4" | "higher">;
        disposeCopy(math: NDArrayMath, copy: NDArray<"float32" | "int32" | "bool", "0" | "1" | "2" | "3" | "4" | "higher">): void;
    };
}
