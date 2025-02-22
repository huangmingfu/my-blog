---
sticky: 500
tag:
 - Technology
---

# Vitest 单元测试

## 为什么需要？

新增功能或修复一个bug时，方便回归测试，确保不会影响其他，产生其他的bug。

## 工具函数

```ts
import { describe, expect, it } from 'vitest';
```

### 1. 普通工具方法测试
```ts
import { describe, expect, it } from 'vitest';

describe('toArray', () => {
  it('应将单个元素转换为数组', () => {
    expect(toArray(1)).toEqual([1]);
    expect(toArray('hello')).toEqual(['hello']);
    expect(toArray({ key: 'value' })).toEqual([{ key: 'value' }]);
    expect(toArray(null)).toEqual([null]);
    expect(toArray(undefined)).toEqual([undefined]);
  });

  it('应返回输入的数组', () => {
    expect(toArray([1, 2, 3])).toEqual([1, 2, 3]);
    expect(toArray(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    expect(toArray([null])).toEqual([null]);
    expect(toArray([undefined])).toEqual([undefined]);
  });
});
```

### 2. 第三方库封装方法测试
```ts
import { formatToDateTime } from '..';
import dayjs from 'dayjs';

describe('formatToDateTime', () => {
  it('应将当前日期时间格式化为默认格式', () => {
    const formatted = formatToDateTime();
    expect(formatted).toBe(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  });

  it('应将指定日期时间格式化为默认格式', () => {
    const date = '2023-10-01T12:34:56Z';
    const formatted = formatToDateTime(date);
    expect(formatted).toBe(dayjs(date).format('YYYY-MM-DD HH:mm:ss'));
  });
})
```

## vue 组件

```ts
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount,flushPromises } from '@vue/test-utils'
```

### 1. **DOM 元素的存在性**
   - 使用 `wrapper.find()` 方法查找特定 DOM 元素，并通过 `exists()` 方法判断元素是否存在。
   - 例如：
     ```typescript
     expect(wrapper.find('.vxp-modal__header').exists()).toBe(true)
     ```

### 2. **DOM 元素的属性或样式**
   - 检查元素的类名、属性等是否符合预期。
   - 例如：
     ```typescript
     expect(wrapper.find('.vxp-modal').classes()).toContain('vxp-modal-vars')
     ```

### 3. **DOM 元素的文本内容**
   - 验证元素的文本内容是否正确。
   - 例如：
     ```typescript
     expect(wrapper.find('.vxp-modal__content').text()).toEqual(TEXT)
     ```

### 4. **事件触发和回调函数**
   - 模拟用户交互（如点击按钮）并验证相应的回调函数是否被调用。
   - 例如：
     ```typescript
     const onToggle = vi.fn()
     ;(buttons[0].element as HTMLButtonElement).click()
     await nextTick()
     expect(onToggle).toHaveBeenLastCalledWith(false)

      // or
      const wrapper = mount(() => <UploadContent />)
      const onClick = vi.fn()
      wrapper.find('input').element.addEventListener('click', onClick)
      await wrapper.trigger('click')
      expect(onClick).toHaveBeenCalled()
     ```

### 5. **异步行为**
   - 测试异步操作（如动画、定时器等），确保组件在异步操作完成后表现正确。
   - 例如：
     ```typescript
     await nextTick()
     expect(document.querySelector('.vxp-modal')).not.toBeNull()

     // or
      test('beforeUpload works for resolving upload', async () => {
        const beforeUpload = vi.fn(() => Promise.resolve())
        const httpRequest = ref(vi.fn(() => Promise.resolve()))
        const onSuccess = vi.fn()
        const onError = vi.fn()

        const wrapper = mount(() => (
          <UploadContent
            beforeUpload={beforeUpload}
            httpRequest={httpRequest.value}
            onSuccess={onSuccess}
            onError={onError}
          />
        ))

        const fileList = [new File(['content'], 'test-file.txt')]
        mockGetFile(wrapper.find('input').element, fileList)

        await wrapper.find('input').trigger('change')

        expect(beforeUpload).toHaveBeenCalled()
        await flushPromises()
        expect(onSuccess).toHaveBeenCalled()
        expect(onError).not.toHaveBeenCalled()

        vi.clearAllMocks()

        httpRequest.value = vi.fn(() => Promise.reject())
        await nextTick()

        await wrapper.find('input').trigger('change')

        expect(beforeUpload).toHaveBeenCalled()
        await flushPromises()
        expect(onSuccess).not.toHaveBeenCalled()
        expect(onError).toHaveBeenCalled()
     })
     ```

### 6. **插槽 (Slot) 内容**
   - 验证插槽内容是否正确渲染。
   - 例如：
     ```typescript
     const wrapper = mount(() => (
       <Modal>
         {{
           footer: () => <span class={'footer'}></span>
         }}
       </Modal>
     ))
     expect(wrapper.find('.footer').exists()).toBe(true)
     ```

### 7. **属性传递**
   - 验证传递给组件的属性是否正确应用。
   - 例如：
     ```typescript
     const wrapper = mount(() => <Modal hide-mask></Modal>)
     expect(wrapper.find('.vxp-masker__mask').exists()).toBe(false)
     ```

### 8. **自定义事件处理**
   - 测试自定义事件（如拖拽、调整大小）及其回调函数。
   - 例如：
     ```typescript
     header.dispatchEvent(downEvent)
     expect(onDragStart).toHaveBeenCalledWith(expect.objectContaining({ top: 0, left: 0 }))
     ```

### 总结：
这些测试用例涉及了广泛的验证，包括属性、样式、文本内容、事件处理、异步行为、插槽内容以及属性传递等。这确保了组件不仅能够正确渲染，还能正确响应用户交互和其他逻辑。