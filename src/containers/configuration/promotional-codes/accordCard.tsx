import { Button, Card, CardContent, Typography } from "@mui/material";
import { FaCapsules } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";

export type Props = {
  handleModalOpen: any;
}
export const AccordCard = ({ handleModalOpen }: Props) => <Card style={{ width: "100%", display: 'flex', justifyContent: 'space-between', margin: 1, marginBottom: 12, boxShadow: '0px 10px 10px 0px #110c2e' }}>
  <CardContent style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <FaCapsules size={24} color='green' />
    <Typography variant="h5" component='h1'>Assigned Products</Typography>
  </CardContent>
  <CardContent>
    <Button
      onClick={handleModalOpen}
      color='primary'
      variant='contained'
    >
      Edit
      <FiEdit3 style={{ gap: 2 }} />
    </Button>
  </CardContent>
</Card>