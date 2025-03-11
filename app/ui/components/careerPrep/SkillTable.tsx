"use client";
import { CareerPrepSkillsAssessmentDTO, SkillLevelLabels } from "@/app/lib/admin/careerPrep";
import { FormControlLabel, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";

interface SkillTableProps {
    questions: {
      id: string;
      text: string;
    }[];
    section: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    labels?: Record<number, string>;
    formData: CareerPrepSkillsAssessmentDTO;
  }
  
  export const SkillTable: React.FC<SkillTableProps> = ({
    questions,
    section,
    onChange,
    labels = SkillLevelLabels,
    formData,
  }) => {
    const levels = Object.entries(labels).map(([value, label]) => ({
      value: String(value),
      label,
    }));
  
    useEffect(() => {
      questions.forEach((question) => {
        const currentValue = getCurrentValue(question.id);
        if (!currentValue) {
          handleResponseChange(question.id, "3");
        }
      });
    }, []);
  
    const handleResponseChange = (questionId: string, value: string): void => {
      const syntheticEvent = {
        target: {
          name: `${section}.${questionId}`,
          value,
        },
      } as React.ChangeEvent<HTMLInputElement>;
  
      onChange(syntheticEvent);
    };
  
    const getCurrentValue = (questionId: string): string => {
      const keys = section.split(".");
      let current: any = formData;
      for (const key of keys) {
        if (current[key] === undefined) return "";
        current = current[key];
      }
      return String(current[questionId] || "");
    };
  
    return (
      <TableContainer>
        <Table aria-label="evaluation table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "30%" }}></TableCell>
              {levels.map((level) => (
                <TableCell key={level.value} align="center">
                  {level.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell component="th" scope="row">
                  {question.text}
                </TableCell>
                {levels.map((level) => (
                  <TableCell key={level.value} align="center">
                    <RadioGroup
                      value={getCurrentValue(question.id)}
                      onChange={(e) =>
                        handleResponseChange(question.id, e.target.value)
                      }
                    >
                      <FormControlLabel
                        value={level.value}
                        control={<Radio />}
                        label=""
                        labelPlacement="top"
                        sx={{
                          margin: 0,
                        }}
                      />
                    </RadioGroup>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };