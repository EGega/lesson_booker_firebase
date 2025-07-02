import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../../firebase/firebase'; 
import styled from './Reviews.module.css'
import Navbar from '../../../../components/navbar/Navbar';
const Reviews = () => {
    
const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.warn('No authenticated user.');
        return;
      }

      try {
        const q = query(
          collection(db, 'students'),
          where('userId', '==', currentUser.uid)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const studentDoc = querySnapshot.docs[0].data();
          const studentComments = studentDoc.comments || [];
        console.log('studentComments:', studentComments);
          const cleanedComments = studentComments.map(comment =>
           comment.replace(/\s*with ID:[\s\S]*$/, '')
          );
          setComments(cleanedComments);
        } else {
          console.warn('No student document found for this user.');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchComments();
  }, []);

  return (
    <>
    <Navbar/>
    <div className={styled.container}>
      <h3 className={styled.header}>Your Comments</h3>
      {comments.length === 0 ? (
        <p>There are no comments yet for you.</p>
      ) : (
        <div className={styled.box}>
          {comments.map((comment, index) => (
            <p className={styled.text} key={index}>{comment}</p>
          ))}
        </div>
      )}
    </div>
    </>

  );
}

export default Reviews