import React, { useState } from 'react';
import { Table, Input } from 'antd';

const PhysicalFeaturesTable = () => {
  // State for the first table (Physical Features)
  const [physicalData, setPhysicalData] = useState([
    { key: '1', sno: '1', sex: '2', dob: '3', build: '4', height: '5', complexion: '6', idMarks: '7' },
    { key: '2', sno: '2', sex: '', dob: '', build: '', height: '', complexion: '', idMarks: '' },
    { key: '3', sno: '3', sex: '', dob: '', build: '', height: '', complexion: '', idMarks: '' },
    { key: '4', sno: '4', sex: '', dob: '', build: '', height: '', complexion: '', idMarks: '' },
    { key: '5', sno: '5',sex: '', dob: '', build: '', height: '', complexion: '', idMarks: '' }
  ]);

  // State for the second table (Deformities Peculiarities)
  const [peculiaritiesData, setPeculiaritiesData] = useState([
    { key: '1', deformities: '8', teeth: '9', hair: '10', eyes: '11', habits: '12', dressHabit: '13', languages: '14' },
    { key: '2', deformities: '', teeth: '', hair: '', eyes: '', habits: '', dressHabit: '', languages: '' },
    { key: '3', deformities: '', teeth: '', hair: '', eyes: '', habits: '', dressHabit: '', languages: '' },
    { key: '4', deformities: '', teeth: '', hair: '', eyes: '', habits: '', dressHabit: '', languages: '' },
    { key: '5', deformities: '', teeth: '', hair: '', eyes: '', habits: '', dressHabit: '', languages: '' },
  ]);

  // State for the third table (Place of Offense)
  const [offenseData, setOffenseData] = useState([
    { key: '1', burnMark: '15', leucoderma: '16', mole: '17', scar: '18', tattoo: '19' },
    { key: '2', burnMark: '', leucoderma: '', mole: '', scar: '', tattoo: '' },
    { key: '3', burnMark: '', leucoderma: '', mole: '', scar: '', tattoo: '' },
    { key: '4', burnMark: '', leucoderma: '', mole: '', scar: '', tattoo: '' },
    { key: '5', burnMark: '', leucoderma: '', mole: '', scar: '', tattoo: '' }
  ]);

  // Handle save function for all tables
  const handleSave = (table, key, column, value) => {
    const newData = table === 'physical' ? [...physicalData] :
      table === 'peculiarities' ? [...peculiaritiesData] : 
      [...offenseData];
    const index = newData.findIndex((item) => item.key === key);
    if (index > -1) {
      newData[index][column] = value;
      if (table === 'physical') setPhysicalData(newData);
      else if (table === 'peculiarities') setPeculiaritiesData(newData);
      else setOffenseData(newData);
    }
  };

  // Editable cell for all tables
  const editableCell = ({
    title,
    editable,
    children,
    column,
    record,
    table,
    ...restProps
  }) => {
    return editable ? (
      <td {...restProps}>
        <Input
          defaultValue={children}
          onBlur={(e) => handleSave(table, record.key, column, e.target.value)}
        />
      </td>
    ) : (
      <td {...restProps}>{children}</td>
    );
  };

  // Columns for the first table (Physical Features)
  const physicalColumns = [
    { title: 'S.NO.', dataIndex: 'sno', editable: false },
    { title: 'Sex', dataIndex: 'sex', editable: true },
    { title: 'Date/Year of Birth', dataIndex: 'dob', editable: true },
    { title: 'Build', dataIndex: 'build', editable: true },
    { title: 'Height (cms)', dataIndex: 'height', editable: true },
    { title: 'Complexion', dataIndex: 'complexion', editable: true },
    { title: 'Identification Marks(s)', dataIndex: 'idMarks', editable: true },
    // {
    //   title: 'Action',
    //   dataIndex: 'action',
    //   render: (_, record) => (
    //     <Popconfirm title="Are you sure you want to save?" onConfirm={() => handleSave('physical', record.key)}>
    //       <Button>Save</Button>
    //     </Popconfirm>
    //   ),
    // },
  ];

  // Columns for the second table (Deformities Peculiarities)
  const peculiaritiesColumns = [
    { title: 'Deformities Peculiarities', dataIndex: 'deformities', editable: true },
    { title: 'Teeth', dataIndex: 'teeth', editable: true },
    { title: 'Hair', dataIndex: 'hair', editable: true },
    { title: 'Eyes', dataIndex: 'eyes', editable: true },
    { title: 'Habits', dataIndex: 'habits', editable: true },
    { title: 'Dress Habit(s)', dataIndex: 'dressHabit', editable: true },
    { title: 'Languages/Dialect', dataIndex: 'languages', editable: true },
    // {
    //   title: 'Action',
    //   dataIndex: 'action',
    //   render: (_, record) => (
    //     <Popconfirm title="Are you sure you want to save?" onConfirm={() => handleSave('peculiarities', record.key)}>
    //       <Button>Save</Button>
    //     </Popconfirm>
    //   ),
    // },
  ];

  // Columns for the third table (Place of Offense)
  const offenseColumns = [
    { title: 'Burn Mark', dataIndex: 'burnMark', editable: true },
    { title: 'Leucoderma', dataIndex: 'leucoderma', editable: true },
    { title: 'Mole', dataIndex: 'mole', editable: true },
    { title: 'Scar', dataIndex: 'scar', editable: true },
    { title: 'Tattoo', dataIndex: 'tattoo', editable: true },
    // {
    //   title: 'Action',
    //   dataIndex: 'action',
    //   render: (_, record) => (
    //     <Popconfirm title="Are you sure you want to save?" onConfirm={() => handleSave('offense', record.key)}>
    //       <Button>Save</Button>
    //     </Popconfirm>
    //   ),
    // },
  ];

  const mergedPhysicalColumns = physicalColumns.map((col) => ({
    ...col,
    onCell: (record) => ({
      editable: record.key !== '1' && col.editable, // Make first row non-editable
      table: 'physical',
      column: col.dataIndex,
      record,
    }),
  }));
  
  const mergedPeculiaritiesColumns = peculiaritiesColumns.map((col) => ({
    ...col,
    onCell: (record) => ({
      editable: record.key !== '1' && col.editable, // Make first row non-editable
      table: 'peculiarities',
      column: col.dataIndex,
      record,
    }),
  }));
  
  const mergedOffenseColumns = offenseColumns.map((col) => ({
    ...col,
    onCell: (record) => ({
      editable: record.key !== '1' && col.editable, // Make first row non-editable
      table: 'offense',
      column: col.dataIndex,
      record,
    }),
  }));
  

  return (
    <div>
      <h3>Physical Features, Deformities, and Other Details of the Suspect</h3>
      <Table
        components={{
          body: {
            cell: editableCell,
          },
        }}
        columns={mergedPhysicalColumns}
        dataSource={physicalData}
        pagination={false}
        rowClassName="editable-row"
        bordered
      />

      <h3>Deformities, Peculiarities, and Other Characteristics</h3>
      <Table
        components={{
          body: {
            cell: editableCell,
          },
        }}
        columns={mergedPeculiaritiesColumns}
        dataSource={peculiaritiesData}
        pagination={false}
        rowClassName="editable-row"
        bordered
      />

      <h3>Place of Offense</h3>
      <Table
        components={{
          body: {
            cell: editableCell,
          },
        }}
        columns={mergedOffenseColumns}
        dataSource={offenseData}
        pagination={false}
        rowClassName="editable-row"
        bordered
      />
    </div>
  );
};

export default PhysicalFeaturesTable;
