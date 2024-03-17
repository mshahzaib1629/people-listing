"use client";
import { decrement, increment } from "@/store/slices/counter";
import { fetchPeopleThunk } from "../store/slices/people";
import { RootState } from "../store/store";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => {
            dispatch(fetchPeopleThunk());
            dispatch(increment());
          }}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
