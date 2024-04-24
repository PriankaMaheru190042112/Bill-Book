
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import Fields from './Fields';

const InvoiceItem = ({ onItemizedItemEdit, currency, items, onRowDel, onRowAdd }) => {
  const handleDelEvent = (item) => {
    onRowDel(item);
  };

  const handleItemEdit = (id, name, value) => {
    onItemizedItemEdit(id, name, value);
  };

  const itemTable = items.map((item) => (
    <ItemRow
      key={item.id}
      item={item}
      onItemizedItemEdit={handleItemEdit}
      currency={currency}
      onDelEvent={handleDelEvent}
    />
  ));

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {itemTable}
        </tbody>
      </Table>
      <Button className="fw-bold" onClick={onRowAdd}>Add Item</Button>
    </div>
  );
};

const ItemRow = ({ item, onItemizedItemEdit, currency, onDelEvent }) => {
  const handleDelEvent = () => {
    onDelEvent(item);
  };

  return (
    <tr>
      <td style={{width: '100%'}}>
        <Fields
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: item.name,
            id: item.id,
          }}
        />
        <Fields
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: item.description,
            id: item.id
          }}
        />
      </td>
      <td style={{minWidth: '70px'}}>
        <Fields
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: item.quantity,
            id: item.id,
          }}
        />
      </td>
      <td style={{minWidth: '130px'}}>
        <Fields
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            precision: 2, // Corrected spelling
            textAlign: "text-end",
            value: item.price,
            id: item.id,
          }}
        />
      </td>
      <td className="text-center" style={{minWidth: '50px'}}>
        <BiTrash onClick={handleDelEvent} style={{height: '33px', width: '33px', padding: '7.5px'}} className="text-white mt-1 btn btn-danger"/>
      </td>
    </tr>
  );
};

export default InvoiceItem;
