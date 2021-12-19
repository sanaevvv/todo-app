import React, { useState } from 'react';
import styles from "./TaskItem.module.css";
import { ListItem, TextField, Grid } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { db } from './firebase';
import { doc, collection, deleteDoc, setDoc } from 'firebase/firestore';

type PROPS = {
  id: string;
  title: string;
};
export const TaskItem: React.FC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title);
  const tasksRef = collection(db, 'tasks');
  const editTask = async() => {
    await setDoc(
      doc(tasksRef, props.id),
      {
        title: title,
      },
      { merge: true }
    );
  };
  const deleteTask = async() => {
    await deleteDoc(doc(tasksRef, props.id));

   };



  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid container justify="flex-end">
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Edit task"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <button className={styles.taskitem__icon} onClick={editTask}>
          <EditOutlinedIcon />
        </button>
        <button className={styles.taskitem__icon} onClick={deleteTask}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </Grid>
    </ListItem>
  );
};
