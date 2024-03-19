[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/Dt3ukIt2)
# Parallel Mergesort

Implement a parallel version of mergesort (both the original recursive and the
iterative in-place version from a previous exercise are fine). You may use any
parallelization framework or method.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the span of the parallel program, in terms of worst-case $\Theta$? Hint:
It may help to consider the DAG of the parallel program.

# Runtime Analysis of Parallel Mergesort Function

## Algorithm Steps:

1. **Base Case Check**: The function checks if the array length is less than 2. If so, it returns the array as it is already sorted.
2. **Divide**: The array is divided into two halves around the middle.
3. **Recursive Sort**: Each half is sorted in parallel.
4. **Merge**: The sorted halves are merged together into a single sorted array.

## Analysis:

- **Base Case Check**: This is a constant-time operation, $O(1)$, as it only involves a comparison.

- **Divide**: Splitting the array into two halves is also a constant-time operation, $O(1)$, assuming $slice$ operations are linear but not contributing significantly to the span since they do not depend on other operations.

- **Recursive Sort**: The key operation where parallelism is introduced. Each recursive call to $mergeSort$ on the halves can theoretically happen in parallel. The depth of recursion is $O(\log n)$ for an array of length $n$.
    - **Parallelism Location**: Parallelism is achieved during the recursive sorting of left and right halves of the array, facilitated by $Promise.all$ for concurrent execution.
  
- **Merge**: Merging two sorted arrays of size $\(n/2\)$ ea2ch into a single sorted array is a linear operation, $O(n)$, in the worst case. However, because the merging step takes place after sorting the smaller sections, its impact on the span depends on how long it takes to perform a single merge when we've divided everything down to the smallest pieces (at the deepest level of recursion).
    - **Use of Promises**: Promises synchronize the parallel sorting tasks, ensuring both halves are sorted before merging, optimizing asynchronous control flow.

When using parallel execution, the most important part of the parallel mergesort algorithm involves descending one path of the recursion tree, performing the merge operation at every level. We continuously split the problem size into smaller halves with every step. If we're able to sort these smaller parts all at once, without waiting, then the key factor affecting the total time to sort everything is essentially how fast we can combine these sorted mini-sections into one completely sorted list.

## Worst-Case Scenario:

In the worst-case scenario, in an ideal parallel computing environment, the span of the algorithm is determined by the depth of the recursion and the merge operations. The depth of the recursion is $O(\log n)$, and at each level of recursion, a merge operation of at most $O(n)$ occurs. However, due to the parallel execution, the merge operations at different levels of the recursion do not add up linearly but instead the overall time it takes is influenced by how many times we split and merge the pieces, which is the depth of the recursion.

## Conclusion

The overall worst-case span of the parallel mergesort function, focusing on the critical path in an ideal parallel execution environment, is: $$Θ(\log n)$$ 

The overall worst-case complexity of the parallel mergesort function, considering the merging operations that happen at each level of the logarithmic depth recursion tree is: $$Θ(n \log n)$$

It's also important to note that while the span gives us an understanding of the potential parallel execution time, the actual performance from parallelism would depend on the specific environment's ability to execute parallel tasks, like the number of available CPU cores.

Useful References:
https://rachitvasudeva.medium.com/parallel-merge-sort-algorithm-e8175ab60e7
https://www.tutorialspoint.com/parallel_algorithm/parallel_algorithm_sorting.htm
https://stackoverflow.com/questions/8435640/parallel-merge-sort-performance


