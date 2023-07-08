import React, { useState } from 'react';
import './style.css';

const Table = ({ rows, cols }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <table>
          <thead>
            <th colspan={cols}>Regular Row Increase</th>
          </thead>
          <tbody>
            <td colspan={cols}>cols * row + (col + 1)</td>
            {Array.from({ length: rows }, () => 0).map((_, row) => (
              <tr key={row}>
                {Array.from({ length: cols }, () => 0).map((_, col) => (
                  // Every time value should be increased as col index increases, hence col + 1
                  // For next row, values should be more by rows amount from previous row, hence rows * col + 1
                  // first row values be 1,2,3,...cols
                  // second row values be {cols}+1, {cols}+2,...,cols+cols
                  // third row values be 2{cols}+1, 2{cols}+2,...2{cols}+cols
                  // {rows}th row values be {rows-1}{cols}+1, {rows-1}{cols}+2,...,{rows-1}{cols}+cols
                  <td>{cols * row + col + 1}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead>
            <th colspan={cols}>Zigzag Row Increase</th>
          </thead>
          <tbody>
            <tr colspan={cols}>
              <td colspan={cols}>even row index: cols * row + (col + 1)</td>
            </tr>
            <tr>
              <td colspan={cols}>odd row index: cols * (row + 1) - col</td>
            </tr>
            {Array.from({ length: rows }, () => 0).map((_, row) => (
              <tr key={row}>
                {Array.from({ length: cols }, () => 0).map((_, col) => (
                  // same as row increase, but when row index is even, col values should be increasing
                  //and when row index is odd, col values should be reverse increasing or decreasing and for that
                  // row should start with value double than last value of previous row
                  // and that value should get decreased as the col index increases
                  <td>
                    {row % 2 === 0
                      ? cols * row + col + 1
                      : cols * (row + 1) - col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <table>
          <thead>
            <th colspan={cols}>Regular Col Increase</th>
          </thead>
          <tbody>
            <td colspan={cols}>rows * col + (row + 1)</td>
            {Array.from({ length: rows }, () => 0).map((_, row) => (
              <tr key={row}>
                {Array.from({ length: cols }, () => 0).map((_, col) => (
                  <td>{rows * col + (row + 1)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead>
            <th colspan={cols}>Zigzag Col Increase</th>
          </thead>
          <tbody>
            <tr colspan={cols}>
              <td colspan={cols}>even col index: rows * col + (row + 1)</td>
            </tr>
            <tr>
              <td colspan={cols}>odd col index: rows * (col + 1) - row</td>
            </tr>
            {Array.from({ length: rows }, () => 0).map((_, row) => (
              <tr key={row}>
                {Array.from({ length: cols }, () => 0).map((_, col) => (
                  <td>
                    {col % 2 === 0
                      ? rows * col + (row + 1)
                      : rows * (col + 1) - row}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function App() {
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(4);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={'input-row'}>
          <label>Rows </label>
          <input
            id="input-rows"
            style={{ marginLeft: '51px' }}
            type="number"
            name="rows"
            min={1}
            value={rows}
            onChange={(e) => setRows(e.target.value)}
          />
        </div>
        <div className={'input-row'}>
          <label>Columns</label>
          <input
            id="input-cols"
            type="number"
            name="cols"
            value={cols}
            onChange={(e) => setCols(e.target.value)}
          />
        </div>
        <button disabled={rows < 1 || cols < 1}>Submit</button>
      </form>
      {Boolean(rows) && Boolean(cols) && <Table rows={rows} cols={cols} />}
    </div>
  );
}
