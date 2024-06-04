import {useDispatch} from "react-redux";

import type {AppDispatch} from "~/store/store";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export {useAppDispatch};
