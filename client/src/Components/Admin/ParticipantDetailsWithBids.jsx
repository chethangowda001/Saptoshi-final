import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParticipantDetailsWithBids = ({ participantId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!participantId) {
        console.log("No participantId provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log(`Fetching data for participant ID: ${participantId}`);
        const response = await axios.get(`http://localhost:3001/participants/${participantId}/bids`);
        console.log("API Response:", response.data);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || err.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, [participantId]);

  if (loading) {
    return <div>Loading participant details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || !data.participantDetails) {
    return <div>No participant details found.</div>;
  }

  const { participantDetails, bids } = data;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Participant Details</h1>
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Name:</strong> {participantDetails.userName}</p>
        <p><strong>Phone:</strong> {participantDetails.userPhoneNo}</p>
        <p><strong>Email:</strong> {participantDetails.userEmail}</p>
        {participantDetails.address && <p><strong>Address:</strong> {participantDetails.address}</p>}
        {participantDetails.aadharNo && <p><strong>Aadhar No:</strong> {participantDetails.aadharNo}</p>}
        {participantDetails.panNo && <p><strong>PAN No:</strong> {participantDetails.panNo}</p>}
      </div>

      <h2 style={{ borderBottom: '1px solid #666', paddingBottom: '5px' }}>Bids</h2>
      {bids && bids.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Bid No</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Bid Value</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Your Bid Value</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Your Bid Payout</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Your Bid Win No</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.Bids.BidNo}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.Bids.BidValue}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.users.BidValue}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.users.BidPayOut}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.users.BidWinNo}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {bid.Bids.PaymentStatus && bid.Bids.PaymentStatus.length > 0 ? (
                    bid.Bids.PaymentStatus.map((status, idx) => (
                      <div key={idx}>
                        {status.userName}: {status.payed ? 'Paid' : 'Not Paid'} ({status.payment})
                      </div>
                    ))
                  ) : (
                    'No payment information'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bids found for this participant.</p>
      )}
    </div>
  );
};

export default ParticipantDetailsWithBids;