import React, { useMemo, useState } from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router'
import SearchBar from '@/shared/components/SearchBar'
import ProductCard from '@/features/shop/components/ProductCard'
import { useProductSearch } from './useProductSearch'
import { useTheme } from '@/shared/hooks/useTheme'
import { Feather } from '@expo/vector-icons'

export default function ProductListScreen() {
  const router = useRouter()
  const { theme: t } = useTheme()
  const { categoryId } = useLocalSearchParams<{ categoryId?: string }>()

  const [keyword, setKeyword] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'price_asc' | 'price_desc'>('newest')

  const params = useMemo(
    () => ({
      keyword: keyword || undefined,
      categoryId: (categoryId as string) || undefined,
      sortBy,
      page: 1,
      limit: 20,
    }),
    [keyword, categoryId, sortBy],
  )

  const { items, loading } = useProductSearch(params)

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* CUSTOM HEADER */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 50,
          paddingBottom: 10,
          backgroundColor: t.colors.bg,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: t.colors.card,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Feather name="arrow-left" size={20} color={t.colors.text} />
        </Pressable>

        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: t.colors.text,
          }}
        >
          Products
        </Text>
      </View>

      {/* SEARCH BAR */}
      <View style={{ paddingHorizontal: 16 }}>
        <SearchBar placeholder="Search products..." value={keyword} onChangeText={setKeyword} />
      </View>

      {/* SORT CHIPS */}
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingHorizontal: 16,
          marginTop: 14,
          marginBottom: 6,
        }}
      >
        {['newest', 'rating', 'price_asc', 'price_desc'].map((k) => {
          const active = k === sortBy
          return (
            <Pressable
              key={k}
              onPress={() => setSortBy(k as any)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                borderWidth: 1,
                backgroundColor: active ? t.colors.primary + '22' : t.colors.card,
                borderColor: active ? t.colors.primary : t.colors.textSecondary + '33',
              }}
            >
              <Text
                style={{
                  color: active ? t.colors.primary : t.colors.text,
                  fontSize: 13,
                  fontWeight: active ? '600' : '400',
                }}
              >
                {k.replace('_', ' ')}
              </Text>
            </Pressable>
          )
        })}
      </View>

      {/* PRODUCT GRID */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
        // contentContainerStyle={{ paddingTop: 6, paddingBottom: 50 }}
        renderItem={({ item }) => (
          <Pressable
            style={{ width: '48%' }}
            onPress={() => router.push(`/shop/product/${item.id}`)}
          >
            <ProductCard product={item} />
          </Pressable>
        )}
      />

      {loading && <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading…</Text>}
    </View>
  )
}
