
# dom-tree

  transform component/dom list nodes into a tree

## Installation

  Install with [component(1)](http://component.io):

    $ component install dombojs/dom-tree

## API

### .tree()

  Return list elements as a tree

### TreeNode.toArray(arr)

  Return flattened tree as an array

  If array `arr` is passed in, tree elements will be appended to it

### TreeNode.toList(reverse)

  Return flattened tree as a component/dom `List`

  Reverse the list to process children before parents

## License

  MIT
