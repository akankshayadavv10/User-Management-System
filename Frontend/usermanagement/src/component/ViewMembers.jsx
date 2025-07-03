// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";

// const ViewMembers = () => {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch members from backend
//     axios
//       .get("http://localhost:5000/api/members")
//       .then((res) => {
//         setMembers(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch members:", err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <Paper sx={{ maxWidth: 800, mx: "auto", mt: 6, p: 4 }}>
//       <Typography variant="h5" gutterBottom>
//         View Members
//       </Typography>

//       {loading ? (
//         <Box sx={{ textAlign: "center", mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : members.length === 0 ? (
//         <Typography>No members found.</Typography>
//       ) : (
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Name</strong></TableCell>
//               <TableCell><strong>Email</strong></TableCell>
//               <TableCell><strong>Contact</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {members.map((member, index) => (
//               <TableRow key={index}>
//                 <TableCell>{member.name}</TableCell>
//                 <TableCell>{member.email}</TableCell>
//                 <TableCell>{member.contact}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}
//     </Paper>
//   );
// };

// export default ViewMembers;
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Fade,
} from "@mui/material";
import axios from "axios";

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const useDummyData = true; // Set false to fetch from backend

  useEffect(() => {
    // console.log(members);

    //  else {
    axios
      .get("http://localhost:5000/members")
      .then((res) => {
        console.log("Fetched members:", res.data);
        const membersArray = res.data ; // adjust if your array is inside a `data` key

        setMembers(membersArray || []); // default to empty array
        setLoading(false);
        console.log("Members state updated:", membersArray);
      })
      .catch((err) => {
        console.error("Failed to fetch members:", err);
        setMembers([]); // ensure it's always an array
        setLoading(false);
      });

    // }
  }, []);

  return (
    <Fade in timeout={600}>
      <Paper
        sx={{
          maxWidth: 900,
          mx: "auto",
          mt: 6,
          p: 4,
          backgroundColor: "#FFFFFF",
          boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
          borderRadius: "16px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#1E1E2F",
            mb: 3,
            textAlign: "center",
          }}
        >
          Members Directory
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : members.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: "#888" }}>
            No members found.
          </Typography>
        ) : (
          <Table
            sx={{
              minWidth: 650,
              "& .MuiTableCell-head": {
                backgroundColor: "#1E1E2F",
                color: "#FFD700",
                fontWeight: "bold",
              },
              "& .MuiTableRow-hover:hover": {
                backgroundColor: "#F5F5F5",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Fade>
  );
};

export default ViewMembers;
