import React, { useState, useEffect, useCallback  } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button, Form, Card } from "react-bootstrap";
import InvoiceItem from "./InvoiceItem";
import InputGroup from "react-bootstrap/InputGroup";
import InvoiceModal from "./InvoiceModal"; 

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("$");
  const [currentDate, setCurrentDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [billTo, setBillTo] = useState("");
  const [billToEmail, setBillToEmail] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [billFromEmail, setBillFromEmail] = useState("");
  const [billFromAddress, setBillFromAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [total, setTotal] = useState("0.00");
  const [subTotal, setSubTotal] = useState("0.00");
  const [taxRate, setTaxRate] = useState("");
  const [taxAmmount, setTaxAmmount] = useState("0.00");
  const [discountRate, setDiscountRate] = useState("");
  const [discountAmmount, setDiscountAmmount] = useState("0.00");
  const [items, setItems] = useState([
    {
      id: 0,
      name: "",
      description: "",
      price: "1.00",
      quantity: 1,
    },
  ]);

  const handleCalculateTotal = useCallback(() => {
    let subTotal = 0;
    items.forEach((item) => {
      subTotal += parseFloat(
        (parseFloat(item.price) * parseInt(item.quantity)).toFixed(2)
      );
    });

    setSubTotal(subTotal.toFixed(2));
    setTaxAmmount((subTotal * (taxRate / 100)).toFixed(2));
    setDiscountAmmount((subTotal * (discountRate / 100)).toFixed(2));
    setTotal(
      (
        subTotal -
        subTotal * (discountRate / 100) +
        parseFloat(subTotal * (taxRate / 100))
      ).toFixed(2)
    );
  }, [items, taxRate, discountRate]);

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
    handleCalculateTotal();
  }, [handleCalculateTotal]);

  const handleRowDel = (item) => {
    const filteredItems = items.filter((i) => i.id !== item.id);
    setItems(filteredItems);
  };

  const handleAddEvent = () => {
    const newItem = {
      id: new Date().getTime(),
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    setItems([...items, newItem]);
  };

  const onItemizedItemEdit = (id, name, value) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [name]: value,
        };
      }
      return item;
    });
    setItems(updatedItems);
    handleCalculateTotal();
  };

  const editField = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "currency":
        setCurrency(value);
        break;
      case "invoiceNumber":
        setInvoiceNumber(value);
        break;
      case "dateOfIssue":
        setDateOfIssue(value);
        break;
      case "billTo":
        setBillTo(value);
        break;
      case "billToEmail":
        setBillToEmail(value);
        break;
      case "billToAddress":
        setBillToAddress(value);
        break;
      case "billFrom":
        setBillFrom(value);
        break;
      case "billFromEmail":
        setBillFromEmail(value);
        break;
      case "billFromAddress":
        setBillFromAddress(value);
        break;
      case "notes":
        setNotes(value);
        break;
      case "taxRate":
        setTaxRate(value);
        break;
      case "discountRate":
        setDiscountRate(value);
        break;
      default:
        break;
    }
    handleCalculateTotal();
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <Form onSubmit={openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control
                    type="date"
                    value={dateOfIssue}
                    name={"dateOfIssue"}
                    onChange={(event) => editField(event)}
                    style={{
                      maxWidth: "150px",
                    }}
                    required="required"
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;ID:&nbsp;</span>
                <Form.Control
                  type="number"
                  value={invoiceNumber}
                  name={"invoiceNumber"}
                  onChange={(event) => editField(event)}
                  min="1"
                  style={{
                    maxWidth: "70px",
                  }}
                  required="required"
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice to?"}
                  rows={3}
                  value={billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="name"
                  required="required"
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="email"
                  required="required"
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(event) => editField(event)}
                  required="required"
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice from?"}
                  rows={3}
                  value={billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="name"
                  required="required"
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="email"
                  required="required"
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(event) => editField(event)}
                  required="required"
                />
              </Col>
            </Row>
            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={currency}
              items={items}
            />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>
                    {currency}
                    {subTotal}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">({discountRate || 0}%)</span>
                    {currency}
                    {discountAmmount || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:</span>
                  <span>
                    <span className="small ">({taxRate || 0}%)</span>
                    {currency}
                    {taxAmmount || 0}
                  </span>
                </div>
                <hr />
                <div
                  className="d-flex flex-row align-items-start justify-content-between"
                  style={{
                    fontSize: "1.125rem",
                  }}
                >
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {currency}
                    {total || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thanks for your business!"
              name="notes"
              value={notes}
              onChange={(event) => editField(event)}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button variant="primary" type="submit" className="d-block w-100">
              Review Invoice
            </Button>
            <InvoiceModal
              showModal={isOpen}
              closeModal={closeModal}
              info={{
                currentDate,
                invoiceNumber,
                dateOfIssue,
                billTo,
                billToEmail,
                billToAddress,
                billFrom,
                billFromEmail,
                billFromAddress,
                notes,
              }}
              items={items}
              currency={currency}
              subTotal={subTotal}
              taxAmmount={taxAmmount}
              discountAmmount={discountAmmount}
              total={total}
            />
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={(event) => editField(event)}
                className="btn btn-light my-1"
                aria-label="Change Currency"
                name="currency"
              >
                <option value="BDT">BDT(Bangladeshi Taka)</option>
                <option value="$">USD (United States Dollar)</option>
            
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={taxRate}
                  onChange={(event) => editField(event)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={discountRate}
                  onChange={(event) => editField(event)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;
