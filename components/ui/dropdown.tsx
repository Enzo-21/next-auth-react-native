import React, { useState } from 'react';
import { TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';

interface Item {
    label: string;
    value: string;
}

interface Props {
    open: boolean;
    value: string | null;
    items: Item[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setValue: React.Dispatch<React.SetStateAction<string | null>>;
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const DropDown: React.FC<Props> = ({
    open,
    value,
    items,
    setOpen,
    setValue,
    setItems,
}: Props) => {
    const [search, setSearch] = useState('');

    const onSearch = (text: string) => {
        setSearch(text);
    };

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                style={{
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: open ? 0 : 1,
                    borderBottomLeftRadius: open ? 0 : 10,
                    borderBottomRightRadius: open ? 0 : 10,
                }}
                onPress={() => {
                    setOpen(!open);
                }}
            >
                <Text>{value ? value : 'Select Item'}</Text>
                <Text>
                    {open ? (
                        <Feather name="x" size={24}  />
                    ) : (
                        <Feather name="chevron-down" size={24}  />
                    )}
                </Text>
            </TouchableOpacity>
            {open && (
                <View
                    style={{
                        elevation: 5,
                        maxHeight: 300,
                        alignSelf: 'center',
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderTopWidth: 0,
                        borderColor: 'gray',
                        borderTopRightRadius: 0,
                        borderTopLeftRadius: 0,
                    }}
                >
                    <TextInput
                        placeholder="Search.."
                        value={search}
                        onChangeText={onSearch}
                        style={{
                            width: '90%',
                            height: 50,
                            alignSelf: 'center',
                            borderWidth: 0.2,
                            borderColor: '#8e8e8e',
                            borderRadius: 7,
                            marginTop: 20,
                            paddingLeft: 20,
                        }}
                    />
                   {items
                        .filter((item) =>
                            item.label.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((item, index, array) => (
                            <TouchableOpacity
                                key={item.value}
                                style={{
                                    width: '85%',
                                    alignSelf: 'center',
                                    height: 50,
                                    justifyContent: 'center',
                                    borderBottomWidth: index !== array.length - 1 ? 0.5 : 0,
                                    borderColor: '#8e8e8e',
                                }}
                                onPress={() => {
                                    setValue(item.value);
                                    setOpen(false);
                                }}
                            >
                                <Text style={{ fontWeight: '600' }}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                </View>
            )}
        </View>
    );
};

export default DropDown;
