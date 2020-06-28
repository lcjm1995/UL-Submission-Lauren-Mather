import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

import { itemDetails } from "../types";
import { db } from "../services/firebase";

import "../App.css";

export default function MainPage(this: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectChoice, setSelectChoice] = useState("priceAscending");
  const [mobileData, setMobileData] = useState<itemDetails[]>([]);
  const [searchResults, setSearchResults] = useState<itemDetails[]>([]);

  useEffect(() => {
    db.collection("itemDetails")
      .get()
      .then((snapshot) => {
        const returnedItems: itemDetails[] = [];
        snapshot.forEach((snap) => {
          //@ts-ignore
          returnedItems.push(snap.data());
        });
        setMobileData(returnedItems);
        setSearchResults(returnedItems);
      })
      .catch(() => {
        setMobileData([]);
      });
  }, []);

  useEffect(() => {
    const results = mobileData.filter((mobileData) =>
      mobileData.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (searchTerm) {
      setSearchResults(results);
    } else {
      setSearchResults(mobileData);
    }
  }, [searchTerm]);

  function sortAscending() {
    searchResults.sort(function (a, b) {
      const costA = a.priceValue;
      const costB = b.priceValue;
      if (costA < costB) {
        return -1;
      }
      if (costA > costB) {
        return 1;
      }
      return 0;
    });
  }

  function sortDescending() {
    searchResults.sort(function (a, b) {
      const costA = a.priceValue;
      const costB = b.priceValue;
      if (costA > costB) {
        return -1;
      }
      if (costA < costB) {
        return 1;
      }
      return 0;
    });
  }

  if (selectChoice === "priceAscending") {
    sortAscending();
  } else if (selectChoice === "priceDescending") {
    sortDescending();
  }

  return (
    <div>
      <h1 placeholder="pageHeader"> Available Items in Stock</h1>
      <div className="content-body">
        <div className="search-body">
          <Form className="searchbar-form">
            <FormGroup>
              <Input
                type="text"
                placeholder="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <div>
                <label>Sort by price:</label>
                <select
                  className="select-sort"
                  placeholder="select-sort"
                  onChange={(event) => setSelectChoice(event.target.value)}
                >
                  <option placeholder="ascending" value={"priceAscending"}>
                    {" "}
                    Price (Ascending)
                  </option>
                  <option placeholder="descending" value={"priceDescending"}>
                    {" "}
                    Price (Descending)
                  </option>
                </select>
                <div />
                <label>Sort by type:</label>
                <select className="select-sort">
                  <option value={"electrical"}> Electrical</option>
                  <option value={"book"}> Book</option>
                  <option value={"running"}> Running</option>
                  <option value={"voucher"}> Voucher</option>
                  <option value={"ceramics"}> Ceramics</option>
                  <option value={"casual"}> Casual</option>
                </select>
              </div>

              <div className="items-results">
                {searchResults.map((item) => (
                  <div>
                    <h1 placeholder="itemID">{item.id}</h1>
                    <p> Name: {item.name} </p>
                    <p>Description: {item.description}</p>
                    <p>Cost: {item.priceValue}</p>
                    <p>Currency: {item.priceCurrency}</p>
                    <p>Type: {item.type}</p>
                    <p>Department: {item.department}</p>
                    <p>Weight: {item.weight}</p>
                  </div>
                ))}
              </div>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}
