// 'use client';
// import React, { useEffect, useState } from 'react';
// import Grid from '@mui/material/Unstable_Grid2';
// import { Budget } from '@/components/dashboard/overview/budget';
// import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
// import { TotalProfit } from '@/components/dashboard/overview/total-profit';
// import { Sales } from '@/components/dashboard/overview/sales';
// import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
// import { Traffic } from '@/components/dashboard/overview/traffic';

// interface Product {
//   id: number;
//   product_name: string;
//   quantity: number;
//   price: number;
// }

// export default function Page(): React.JSX.Element {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/dashboard/products'); 
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data: Product[] = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

  
//   const totalProducts = products.length; 
//   const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0); // Total quantity of products
//   const totalRevenue = products.reduce((sum, product) => sum + product.price * product.quantity, 0); // Total revenue based on quantity and price

//   // Dummy data for when products are not available
//   const dummyData = [
//     { product_name: 'Sample Product A', quantity: 10, price: 15 },
//     { product_name: 'Sample Product B', quantity: 20, price: 25 },
//   ];

//   // Fallback data if products are not fetched
//   const currentProducts = products.length > 0 ? products : dummyData;

//   return loading ? (
//     <div>Loading...</div> // Consider adding a loading spinner for a better UX
//   ) : (
//     <Grid container spacing={3}>
//       <Grid lg={3} sm={6} xs={12}>
//         <Budget diff={0} trend="up" sx={{ height: '100%' }} value={`$${totalRevenue.toFixed(2)}`} />
//       </Grid>
//       <Grid lg={3} sm={6} xs={12}>
//         <TotalCustomers diff={0} trend="down" sx={{ height: '100%' }} value={`${totalProducts} products`} />
//       </Grid>
//       <Grid lg={3} sm={6} xs={12}>
//         <TasksProgress sx={{ height: '100%' }} value={totalQuantity > 0 ? (totalQuantity / (totalProducts || 1)) * 100 : 0} />
//       </Grid>
//       <Grid lg={3} sm={6} xs={12}>
//         <TotalProfit sx={{ height: '100%' }} value={`$${totalRevenue.toFixed(2)}`} />
//       </Grid>
//       <Grid lg={8} xs={12}>
//         <Sales
//           chartSeries={[
//             { name: 'Quantity', data: currentProducts.map((product) => product.quantity) },
//             { name: 'Price', data: currentProducts.map((product) => product.price) },
//           ]}
//           sx={{ height: '100%' }}
//         />
//       </Grid>
      
//       <Grid lg={4} md={6} xs={12}>
//         <Traffic chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
//       </Grid>

//     </Grid>
//   );
// }



'use client';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Budget } from '@/components/dashboard/overview/budget';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { Traffic } from '@/components/dashboard/overview/traffic';

interface Product {
  id: number;
  title: string;
  inventory_quantity: number;
  price: string;  
}

export default function Page(): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_shopify_products/'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.products); 
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum, product) => sum + product.inventory_quantity, 0);
  const totalRevenue = products.reduce((sum, product) => sum + parseFloat(product.price) * product.inventory_quantity, 0);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <Budget diff={0} trend="up" sx={{ height: '100%' }} value={`$${totalRevenue.toFixed(2)}`} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers diff={0} trend="down" sx={{ height: '100%' }} value={`${totalProducts} products`} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TasksProgress 
          sx={{ height: '100%' }} 
          value={totalQuantity > 0 ? Math.round((totalQuantity / (totalProducts || 1)) * 100) : 0} 
        />
      </Grid>

      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value={`$${totalRevenue.toFixed(2)}`} />
      </Grid>
      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: 'Quantity', data: products.map((product) => product.inventory_quantity) },
            { name: 'Price', data: products.map((product) => parseFloat(product.price)) },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
}
