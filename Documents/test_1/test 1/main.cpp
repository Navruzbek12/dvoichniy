
#include <iostream>
#include <vector>
#include <algorithm>
#include <stdexcept>

using namespace std;

template<typename T>
class Array {
private:
    vector<T> data;

public:
    Array() {}

    void addElement(const T& element) {
        data.push_back(element);
    }

    bool findElement(const T& element) {
        return find(data.begin(), data.end(), element) != data.end();
    }

    T findMax() {
        if (data.empty()) {
            throw logic_error("Массив пустой");
        }
        return *max_element(data.begin(), data.end());
    }

    T findMin() {
        if (data.empty()) {
            throw logic_error("Массив пустой");
        }
        return *min_element(data.begin(), data.end());
    }

    void removeInRange(const T& start, const T& end) {
        if (data.empty()) {
            throw logic_error("Массив пустой");
        }
        auto startIter = find(data.begin(), data.end(), start);
        auto endIter = find(data.begin(), data.end(), end);
        if (startIter == data.end() || endIter == data.end() || startIter > endIter) {
            throw logic_error("Неверный диапазон для удаления");
        }
        data.erase(startIter, endIter + 1);
    }

    void display() const {
        for (const auto& elem : data) {
            cout << elem << " ";
        }
        cout << endl;
    }

    int getSize() const {
        return data.size();
    }

    void displayReverse() const {
        for (auto it = data.rbegin(); it != data.rend(); ++it) {
            cout << *it << " ";
        }
        cout << endl;
    }
};

void displayMenu() {
    cout << "\n1. Добавить элемент\n"
         << "2. Найти элемент\n"
         << "3. Найти максимальный элемент\n"
         << "4. Найти минимальный элемент\n"
         << "5. Удалить элементы в диапазоне\n"
         << "6. Показать массив\n"
         << "7. Показать массив в обратном порядке\n"
         << "8. Количество элементов\n"
         << "9. Выход\n"
         << "Выберите опцию: ";
}

template<typename T>
void handleArrayOperations(Array<T>& array) {
    int choice;
    displayMenu();
    do {
        cin >> choice;
        switch (choice) {
            case 1: {
                T element;
                cout << "Введите элемент для добавления: ";
                cin >> element;
                array.addElement(element);
                break;
            }
            case 2: {
                T element;
                cout << "Введите элемент для поиска: ";
                cin >> element;
                if (array.findElement(element)) {
                    cout << "Элемент найден в массиве.\n";
                } else {
                    cout << "Элемент не найден в массиве.\n";
                }
                break;
            }
            case 3: {
                try {
                    cout << "Максимальный элемент в массиве: " << array.findMax() << endl;
                } catch (const logic_error& e) {
                    cerr << "Ошибка: " << e.what() << endl;
                }
                break;
            }
            case 4: {
                try {
                    cout << "Минимальный элемент в массиве: " << array.findMin() << endl;
                } catch (const logic_error& e) {
                    cerr << "Ошибка: " << e.what() << endl;
                }
                break;
            }
            case 5: {
                T start, end;
                cout << "Введите начало диапазона для удаления: ";
                cin >> start;
                cout << "Введите конец диапазона для удаления: ";
                cin >> end;
                try {
                    array.removeInRange(start, end);
                } catch (const logic_error& e) {
                    cerr << "Ошибка: " << e.what() << endl;
                }
                break;
            }
            case 6: {
                cout << "Текущие элементы массива: ";
                array.display();
                break;
            }
            case 7: {
                cout << "Массив в обратном порядке: ";
                array.displayReverse();
                break;
            }
         
            case 8: {
                cout << "Количество элементов в массиве: " << array.getSize() << endl;
                break;
            }
             case 9: {
                cout << "Выход из программы...\n";
                break;
            }
            
            default: {
                cout << "Неверная опция. Попробуйте снова.\n";
            }
        }
        if (choice != 7) displayMenu();
    } while (choice != 7);
}

template<typename T>
void inputArray(Array<T>& array, int length) {
    T element;
    for (int i = 0; i < length; ++i) {
        cout << "Введите элемент " << i + 1 << ": ";
        cin >> element;
        array.addElement(element);
    }
}

int main() {
    try {
        int dataType;
        cout << "Выберите тип данных:\n1. int\n2. float\n3. char\nВведите ваш выбор: ";
        cin >> dataType;

        int length;
        cout << "Введите количество элементов в массиве: ";
        cin >> length;

        switch (dataType) {
            case 1: {
                Array<int> intArray;
                inputArray(intArray, length);
                handleArrayOperations(intArray);
                break;
            }
            case 2: {
                Array<float> floatArray;
                inputArray(floatArray, length);
                handleArrayOperations(floatArray);
                break;
            }
            case 3: {
                Array<char> charArray;
                inputArray(charArray, length);
                handleArrayOperations(charArray);
                break;
            }
            default: {
                cout << "Неверный выбор типа данных.\n";
            }
        }

    } catch (const logic_error& e) {
        cerr << "Ошибка: " << e.what() << endl;
    }

    return 0;
}
