"use client";
import {
  Link,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogContent,
} from "@mui/material";
import * as React from "react";

export default function EmployersListDialog() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Link component="button" onClick={handleOpen}>
        See who else has hired through us.
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogContent>
          <List dense>
            <ListItem>
              <ListItemText>Microsoft</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Amazon</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>CACI</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Washington State Department of Labor and Industries
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Kros-Wise</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Halvik</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Federal Aviation Administration</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Olympia Computer</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Linquest</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Lake County</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Leidos</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Washington State Department of Social and Health Services
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Washington State Department of Health</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Washington State National Guard</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Saint Martin's University</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Washington Technical Solutions</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Oracle</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Interfuze</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Vertex</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Zachary Piper</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Colorado State University System</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>One Source PCS</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Tek Systems</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Fall River Health Services</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Bradken</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Sazerac</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>New Orleans</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Astrion</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Lucky Eagle Casino</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>EXP Technical</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>SearchPro</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>ABC Legal</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Graphium Health</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Costco IT</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>PACCAR Parts</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>PACCAR</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Allen Institute</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Allen Institute for AI</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Chenega Agile Real-Time Solutions</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>US Coast Guard</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>PACCAR IT</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Amazon Web Services</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Sound Transit</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Rover</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Smartsheet</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>BetterTabs</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Ookla</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Salesforce</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>SAP Concur</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Microsoft ST</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Snowflake</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Department of Defense</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Empire Control Systems</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>NCW Libraries</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Key Methods</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>CVCH</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>AT&T</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Southwest Airlines Corporation</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>TELUS International (CDA) Inc</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Chririsa DF LLC</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Catholic Health Initiatives</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Insight Global</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>SBL Enterprises</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Northwest Center Services</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>University of Maryland Global Campus</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>TriNet Corp</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Costco</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>SpaceX</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Aquent</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Blueprint Technologies</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Evergreen Medical Center</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>H10 Capital</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>UW Medicine</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Davis Wright Tremaine LLP</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>BECU</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>General Datatech</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>L.P. (GDT)</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Washington State Housing Finance Commission
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Meta</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Fungi Perfecti</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Kforce</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Experis US Inc</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>TEAMSOS</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Seattle Children's Hospital</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>YUPRO</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>McKinstry</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Securitas</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                King County Information Technology (KCIT)
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Expeditors</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Expedia Group</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Boeing Company</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>YWCA Washington</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Allied Universal Security Services</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Harborstone Credit Union</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Allegis Group</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>NCESD</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Gebber's Farm</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Alaska Airlines</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>The Pokemon Company International</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>SIA Partners US</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Inc.</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>HCL Technologies</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>AIM Consulting</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Microsoft Corporation</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>JPMorgan Chase Corporation</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Accenture</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Sure Start</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Chenega Agile Real-Time Solution</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Cyborg Mobile</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>AllCoveredPainting.com</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Pierce County</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Pacific Northwest National Laboratory</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Green River College</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>RMS Computer Corporation</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Amazon Development Center</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Wenatchee Valley College</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Chelan County PUD</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>CyrusOne</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Gray & Osborne Engineering Consulting</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>ATS Automation</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Audere</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Highline College</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Crane Aerospace & Electronics</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>FDM Group</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Inc.</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Year Up Professional Resources</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Per Scholas</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Wenatchee School District</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>ACI</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Mindtrust</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>TTBH</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Apex Systems</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Columbia Distributing</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Space Exploration Technologies Corp (SpaceX)
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Right Systems Inc.</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>BAE Systems</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Winter Park Resorts</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                The Metropolitan Water District of Southern California
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Keller Rohrbrack L.L.P.</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Dataprise</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>McCall Communications Consulting</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Oak Ridge National Laboratory</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Outlier</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Blue Origin</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Ezsvs usa inc</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Amy's Kitchen</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Nisqually Indian Tribe</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Carnegie Mellon University</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Helpful Computing LLC</ListItemText>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
