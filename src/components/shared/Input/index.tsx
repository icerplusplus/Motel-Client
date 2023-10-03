import { colors } from "@/utils/variables";
import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  TextInputChangeEventData,
  TextInputContentSizeChangeEventData,
} from "react-native";
import { twMerge } from "tailwind-merge";

interface Props extends TextInputProps {
  type?: KeyboardTypeOptions;
  placeholder?: string;
  defaultValue?: string;
  isPassword?: boolean;
  borderColorFocus?: string;
  autoFocus?: boolean;
  className?: string;
  maxLength?: number;
  onChangeValue?: (value: string) => void;
  onFinish?: (status: boolean) => void;
}

export interface InputRefProps {
  getInputId: () => string | undefined;
  focusInputById: (id: string) => void;
  focus: () => void;
  clear: () => void;
  blur: () => void;
  value: string;
  // onFinish: (otpInputRef: React.MutableRefObject<InputRefProps | null>) => void;
}

const Input: React.ForwardRefRenderFunction<InputRefProps, Props> = (
  props,
  ref
) => {
  const [inputFocus, setInputFocus] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const id = React.useId();
  const inputRef = React.useRef<TextInput | null>(null);

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setInputFocus(true);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setInputFocus(false);
  };

  const onChangeValue = (value: string) => {
    props?.onChangeValue && props?.onChangeValue(value);
    setValue(value);
    if (value.length > 0 && props?.onFinish) {
      props?.onFinish(true);
    }
  };

  const focusInputById = React.useCallback((inputId: string) => {
    if (inputId === props?.id) {
      inputRef.current?.focus();
      setInputFocus(true);
    }
  }, []);

  React.useImperativeHandle(ref, () => ({
    getInputId: () => props?.id,
    focus: () => inputRef.current?.focus(),
    clear: () => inputRef.current?.clear(),
    blur: () => inputRef.current?.blur(),
    focusInputById,
    value,
  }));

  return (
    <TextInput
      ref={inputRef}
      key={props.id ?? id}
      id={id}
      className={twMerge(
        "p-2 text-base text-black border border-gray-300 rounded",
        props.className
      )}
      onChangeText={onChangeValue}
      onFocus={onFocus}
      onBlur={onBlur}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      keyboardType={props.type}
      selectionColor={colors.rose}
      cursorColor={colors.rose}
      maxLength={props.maxLength}
      style={
        props.autoFocus || inputFocus
          ? [
              style.inputFocus,
              {
                borderColor: props.borderColorFocus || colors.rose,
              },
              props.autoFocus && style.autoFocus,
            ]
          : style.input
      }
      underlineColorAndroid="transparent"
      secureTextEntry={props.isPassword}
    />
  );
};

export default React.forwardRef<InputRefProps, Props>(Input);

const style = StyleSheet.create({
  inputFocus: {
    borderWidth: 0.5,
  },
  input: {
    borderWidth: 0.2,
    backgroundColor: colors.input,
  },
  autoFocus: {
    fontSize: 24,
    lineHeight: 24,
    width: 48,
    height: 48,
    maxWidth: 48,
    maxHeight: 48,
    textAlign: "center",
  },
});
