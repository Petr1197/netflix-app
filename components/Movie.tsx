import { doc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSigninCheck } from "reactfire";
import { db } from "../authContext";
import { getAuth } from "firebase/auth";

const Movie = ({ item }: any) => {
  const [like, setLike] = useState(false);
  const [Saved, setSaved] = useState(false);
  const { status, data: signInCheckResult } = useSigninCheck();
  const auth = getAuth();
  const user = auth.currentUser;
  const movieID = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    const fetchDoc = async () => {
      const docSnap = await getDoc(movieID);
      const data = docSnap.data()?.savedShows;
      if (data?.find((e: any) => e.title === item.title)) {
        setLike(true);
        setSaved(true);
      }
    };
    fetchDoc();
  }, [user?.email]);

  // if (getDoc(movieID).exists) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  const savedMovie = async () => {
    if (signInCheckResult.signedIn) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please Login To Save Movie");
    }
  };
  // useEffect(() => {
  //   onSnapshot(movieID, (doc) => {
  //     if (doc.data()?.savedShows.find((e) => e.title === item.title)) {
  //       setLike(!like);
  //       setSaved(true);
  //       // console.log("found movie");
  //     }
  //   });
  // }, []);

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-full block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        <p onClick={savedMovie}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
