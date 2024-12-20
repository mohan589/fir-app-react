import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag } from 'antd';
import { Flex } from 'antd';
import { TAG_COLORS } from '../../utils/constants';

const CustomTagsComponent = ({ existingTags, onTagsChange }) => {
  const [tags, setTags] = useState(existingTags); // Initialize tags with existing data

  // Update tags when existingTags prop changes
  useEffect(() => {
    setTags(existingTags);
  }, [existingTags]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
    onTagsChange(newTags); // Notify parent component
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
      onTagsChange(newTags); // Notify parent component
    }
    setInputVisible(false);
    setInputValue('');
  };

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <Flex gap="4px 0" wrap>
      {tags.map((tag, index) => (
        <Tag key={tag} closable onClose={() => handleClose(tag)} color={TAG_COLORS[index % TAG_COLORS.length]}>
          {tag}
        </Tag>
      ))}
      {inputVisible ? (
        <Input
          type="text"
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag icon={<PlusOutlined />} onClick={showInput} style={{ background: '#f0f0f0', borderStyle: 'dashed' }}>
          New Tag
        </Tag>
      )}
    </Flex>
  );
};

export default CustomTagsComponent;
