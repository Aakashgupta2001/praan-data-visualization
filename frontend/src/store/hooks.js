import { useSelector, useDispatch } from "react-redux";

// exporting app dispatcher and selector to access state values and slice functions in app
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
