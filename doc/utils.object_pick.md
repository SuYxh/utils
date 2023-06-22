<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@xinhao0426/utils](./utils.md) &gt; [object\_pick](./utils.object_pick.md)

## object\_pick() function

函数“object\_pick”接受一个对象和一个键数组，并返回一个新对象，该对象仅包含原始对象中的指定键。

**Signature:**

```typescript
declare function object_pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  obj | T | 我们要从中选择特定键的对象。 |
|  keys | K\[\] | keys 是一个字符串数组，表示我们要选择的对象的键。该函数将返回一个新对象，该对象仅包含原始对象中指定的键及其对应的值。 |

**Returns:**

Pick&lt;T, K&gt;

函数 object\_pick 返回一个新对象，该对象仅包含来自输入对象的指定键。
