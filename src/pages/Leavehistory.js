
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>Leave History</Typography>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Days</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaves.map(leave => (
                  <TableRow key={leave.id} hover>
                    <TableCell>{leave.employee_name}</TableCell>
                    <TableCell>{leave.leaveType}</TableCell>
                    <TableCell>{leave.start_date}</TableCell>
                    <TableCell>{leave.end_date}</TableCell>
                    <TableCell>{leave.days}</TableCell>
                    <TableCell sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: 150
                    }}>
                      {leave.reason}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={leave.status}
                        color={
                          leave.status === 'Approved' ? 'success' :
                          leave.status === 'Rejected' ? 'error' : 'warning'
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
     

export default LeavePage;
