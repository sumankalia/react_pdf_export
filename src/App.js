import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then(async (data) => {
        setData(data);
      })
      .then((json) => console.log(json));
  }, []);

  const createHeaders = (keys) => {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        padding: 0,
      });
    }
    return result;
  };

  const exportPdf = async () => {
    var headers = createHeaders([
      "id",
      "title",
      "brand",
      "category",
      "price",
      "rating",
    ]);

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF({ orientation: "landscape" });

    // const tableData = createTableData(doc);
    // doc.table(1, 1, tableData, headers, { autoSize: true });

    doc.autoTable({
      html: "#my-table",
    });

    doc.save("a4.pdf");
  };

  return (
    <div style={{ padding: "30px" }}>
      <button
        className="btn btn-primary float-end mt-2 mb-2"
        onClick={exportPdf}
      >
        Export
      </button>
      <h3>Table Data:</h3>
      <table className="table table-bordered" id="my-table">
        <thead style={{ background: "yellow" }}>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Brand</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data?.products) &&
            data?.products?.map((row) => (
              <tr>
                <td>{row?.id}</td>
                <td>{row?.title}</td>
                <td>{row?.brand}</td>
                <td>{row?.category}</td>
                <td>${row?.price}</td>
                <td>{row?.rating}/5</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
