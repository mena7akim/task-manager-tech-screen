import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/types/task";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { memo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

type Props = {
  tasks: Task[];
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
};

type ItemProps = {
  item: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

const TaskItem: React.FC<ItemProps> = ({ item, onDelete, onToggle }) => {
  return (
    <View className="bg-neutral-900 rounded-xl mb-3 border border-neutral-800">
      <View className="flex-row items-start justify-between p-4">
        <View className="flex-1 mr-14">
          <Pressable
            testID={`toggle-${item.id}`}
            onPress={() => onToggle(item.id)}
            className="flex-1 flex-row items-center gap-3"
          >
            <Checkbox
              checked={!!item.completed}
              onCheckedChange={() => onToggle(item.id)}
              className=" self-start mt-1"
            />
            <Text
              className={`text-lg font-semibold ml-3 flex-1 shrink flex-wrap overflow-hidden ${
                item.completed ? "text-neutral-600 line-through" : "text-white"
              } break-all`}
            >
              {item.title}
            </Text>
          </Pressable>

          {item.description ? (
            <Text
              className={`text-sm leading-5 mt-1.5 ml-10 shrink flex-wrap ${
                item.completed
                  ? "text-neutral-700 line-through"
                  : "text-neutral-400"
              }`}
              numberOfLines={5}
              ellipsizeMode="tail"
            >
              {item.description}
            </Text>
          ) : null}
        </View>

        <View className=" items-end justify-center">
          <Button
            testID={`delete-${item.id}`}
            variant="destructive"
            size="sm"
            icon
            onPress={() => onDelete(item.id)}
          >
            <FontAwesome6 name="trash" size={12} color="white" />
          </Button>
        </View>
      </View>
    </View>
  );
};

const MemoizedTaskItem = memo(TaskItem);

const TaskList: React.FC<Props> = ({
  tasks,
  deleteTask,
  toggleTaskCompletion,
}) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      className="px-4 pb-24"
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <MemoizedTaskItem
          item={item}
          onDelete={deleteTask}
          onToggle={toggleTaskCompletion}
        />
      )}
      ListEmptyComponent={() => (
        <View className="items-center justify-center mt-20 px-8">
          <View className="w-16 h-16 bg-neutral-800 rounded-full items-center justify-center mb-4">
            <FontAwesome6 name="list-check" size={24} color="#F97316" />
          </View>
          <Text className="text-xl font-semibold text-white mb-2">
            No tasks yet
          </Text>
          <Text className="text-neutral-400 text-center leading-6">
            Start being productive by adding your first task
          </Text>
        </View>
      )}
    />
  );
};

export default TaskList;
