import db from "../../server/db";

export default function handler(req, res) {
  const { productId } = req.query;

  if (req.method === 'GET') {
    // Execute the SQL query to fetch the product with the given productId
    const query = 'SELECT * FROM product WHERE id = ?';
    db.query(query, [productId], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving product' });
      } else {
        if (results.length > 0) {
          const product = results[0];
          res.status(200).json(product);
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
