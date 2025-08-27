import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { Modal, Text, TextInput, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  setTitle: (t: string) => void;
  setDescription: (d: string) => void;
  onAdd: () => void;
};

const TaskModal: React.FC<Props> = ({
  visible,
  onClose,
  title,
  description,
  setTitle,
  setDescription,
  onAdd,
}) => {
  const inputRef = useRef<TextInput>(null);
  const isAddEnabled = title.trim() !== "";

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
      onShow={() => {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
      }}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-neutral-900 rounded-t-3xl p-6">
          <View className="w-full flex-row justify-between items-center">
            <Button variant="ghost" size="sm" onPress={() => onClose()}>
              Close
            </Button>
            <Text className="text-lg font-medium text-white">Add Task</Text>
            <Button
              variant="ghost"
              size="sm"
              onPress={() => {
                if (isAddEnabled) onAdd();
              }}
              textStyle={isAddEnabled ? "text-orange-500" : "text-neutral-500"}
              disabled={!isAddEnabled}
            >
              Add
            </Button>
          </View>

          <View className="w-full mt-4">
            <TextInput
              placeholder="Task Title"
              placeholderTextColor="#9CA3AF"
              ref={inputRef}
              value={title}
              onChangeText={setTitle}
              className={`text-white p-4 rounded-lg mb-3 border ${
                title.trim()
                  ? "bg-neutral-800 border-orange-500"
                  : "bg-neutral-800 border-neutral-700"
              }`}
            />
            <TextInput
              placeholder="Task Description (optional)"
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
              className="bg-neutral-800 text-white p-4 rounded-lg border border-neutral-700 focus:border-orange-500"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskModal;
