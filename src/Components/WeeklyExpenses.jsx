import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WeeklyExpenses.css';

function WeeklyExpenses() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState(['', '', '', '', '']);
  const [savings, setSavings] = useState(0); // Start savings at 0

  const handleIncomeChange = (event) => {
    const value = event.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setIncome(value);
    }
  };

  const handleExpenseChange = (index, event) => {
    const value = event.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      const newExpenses = [...expenses];
      newExpenses[index] = value;
      setExpenses(newExpenses);
    }
  };

  const handleAddToSavings = () => {
    setSavings(prevSavings => prevSavings + 100); // Add $100 to savings

    // Subtract $100 from the remaining amount of week 5
    const newExpenses = [...expenses];
    newExpenses[4] = parseFloat(newExpenses[4])+ 100; // Assuming expenses[4] is the amount for week 5
    setExpenses(newExpenses);
  };

  const takeScreenshot = () => {
    window.scrollTo(0, 0);
    html2canvas(document.body, {
      useCORS: true,
      allowTaint: true,
      logging: true,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight
    }).then(canvas => {
      const link = document.createElement('a');
      const currentDate = new Date();
      const formattedDate = `${currentDate.getMonth() + 1}${currentDate.getDate()}${currentDate.getFullYear()}`;
      link.download = `screenshot_${formattedDate}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const parsedIncome = parseFloat(income) || 0;
  const parsedExpenses = expenses.map(expense => parseFloat(expense) || 0);

  const weeklyIncome = parsedIncome / 5;
  let remainingAmounts = [];
  let previousRemaining = 0;

  for (let i = 0; i < 5; i++) {
    const remaining = weeklyIncome + previousRemaining - parsedExpenses[i];
    remainingAmounts.push(remaining);
    previousRemaining = remaining;
  }

  // Calculate total remaining amount excluding week 5
  const totalRemainingAmount = remainingAmounts.reduce((total, remaining, index) => {
    if (index !== 4) {
      return total + remaining;
    }
    return total;
  }, 0);

  // Calculate Weekly Allowance (remaining amount of week 5 divided by 5)
  const weeklyAllowance = (remainingAmounts[4] - savings) / 5;

  return (
    <div className="container mt-5 text-center">
      <div className="row justify-content-center">
        <div className="col">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th colSpan="2" className="text-center" style={{ fontFamily: 'Danfo', fontSize: '2rem' }}>Savings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center" style={{ fontSize: '1.2rem' }}>${savings.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>
                    <button onClick={handleAddToSavings} className="add-button btn-primary transparent-button">Add $100 to Savings</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th colSpan="2" className="text-center" style={{ fontFamily: 'Danfo', fontSize: '2rem' }}>Weekly Allowance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontSize: '1.2rem' }}>${weeklyAllowance.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col">
          <div>
            <table className="table table-bordered table-striped mx-auto">
              <tbody>
                <tr>
                  <th colSpan="3" className="text-center" style={{ fontFamily: 'Danfo', fontSize: '2rem' }}>Monthly Income</th>
                </tr>
                <tr>
                  <td colSpan="3">
                    <input
                      type="text"
                      value={income}
                      onChange={handleIncomeChange}
                      className="form-control mx-auto custom-form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ fontFamily: 'Danfo', fontSize: '2rem' }}>Week</th>
                  <th style={{ fontFamily: 'Danfo', fontSize: '2rem' }}>Weekly Expenses</th>
                  <th style={{ fontFamily: 'Danfo', fontSize: '2rem' }}>Remaining Amount</th>
                </tr>
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        value={expense}
                        onChange={(event) => handleExpenseChange(index, event)}
                        className="form-control mx-auto custom-form-control"
                      />
                    </td>
                    <td>${remainingAmounts[index].toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col">
          <button onClick={takeScreenshot} className="btn btn-primary">Take Screenshot</button>
        </div>
      </div>
    </div>
  );
}

export default WeeklyExpenses;

