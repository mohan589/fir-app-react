import React, { useRef, useState } from 'react';
import { Button, message, Steps, theme } from 'antd';

import { FIR_FORM } from './../../utils/constants'
import FIRForm from './FIRForm';

const FIRWorkflowComponent = ({ workFlowData }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const firFormRef = useRef(null);

  const renderFirstStepComponents = () => {
    if (workFlowData[0] === FIR_FORM) {
      return <FIRForm firFormRef={firFormRef} currentWorkflow={currentWorkflow} />
    }
  }

  const renderSecondStepComponents = () => {
    // return <SecondStepComponent />
  }

  const currentWorkflow = (current) => {
    setCurrent(current)
  }

  const steps = [
    {
      title: 'First',
      content: renderFirstStepComponents(),
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
    {
      title: 'Report',
      content: 'Last-content',
    },
  ];

  const next = () => {
    if (current === 0) {
      if (firFormRef.current) {
        firFormRef?.current?.submitForm();
      }
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = workFlowData.map((item) => ({
    key: item,
    title: item,
  }));

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default FIRWorkflowComponent;