import TaskList from "@/components/features/tasks/TaskList";
import TaskModal from "@/components/features/tasks/TaskModal";
import { Button } from "@/components/ui/button";
import { generateId } from "@/lib/id";
import { Task } from "@/types/task";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useCallback, useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  /*
  Add a new task. Validation: ignore empty titles. IDs are generated
  via generateId() (timestamp-based) which is sufficient for this app. 
  */
  const addTask = useCallback((title: string, description: string) => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  /*
  Delete with a platform-appropriate confirmation. We rely on the
  native Alert on mobile and window.confirm on web. Tests mock Alert.
  */
  const deleteTask = useCallback(
    (id: string) => {
      const task = tasks.find((t) => t.id === id);

      if (Platform.OS === "web") {
        if (window.confirm(`Delete "${task?.title}"?`)) {
          setTasks((prev) => prev.filter((task) => task.id !== id));
        }
      } else {
        Alert.alert(
          "Delete Task",
          `Are you sure you want to delete "${task?.title}"?`,
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                setTasks((prev) => prev.filter((task) => task.id !== id));
              },
            },
          ]
        );
      }
    },
    [tasks]
  );

  /*
  Toggle completion. useCallback keeps a stable reference when passed
  to children, helping avoid unnecessary re-renders of memoized items.
  */
  const toggleTaskCompletion = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1">
        <View className="px-6 py-4 bg-neutral-900 border-b border-neutral-800 mb-4">
          <Text className="text-3xl font-bold text-white">Tasks</Text>
          <Text className="text-sm text-neutral-400 mt-1">
            {tasks.filter((t) => !t.completed).length} of {tasks.length}{" "}
            remaining
          </Text>
        </View>

        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
        />

        <Button
          variant="default"
          size="lg"
          icon
          testID="open-add"
          onPress={() => {
            setModalVisible(true);
          }}
          className="absolute bottom-6 right-6 rounded-full"
        >
          <FontAwesome6 name="plus" size={20} color="white" />
        </Button>

        <TaskModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          onAdd={() => {
            addTask(title, description);
            setTitle("");
            setDescription("");
            setModalVisible(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}
