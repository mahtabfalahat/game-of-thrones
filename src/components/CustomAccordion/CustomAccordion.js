import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './style.scss' ; 

export default function CustomAccordion({title , children , disabled}) {
  return (
    <div>
      <Accordion disabled = {disabled}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}  aria-controls="panel2a-content" id="panel2a-header" >
          <Typography className='.text-title'>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
