import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native'
import { useTheme } from '@/shared/hooks/useTheme'
import { Feather } from '@expo/vector-icons'
import SearchBar from '@shared/components/SearchBar'
import SectionHeader from '@shared/components/SectionHeader'
import CategoryPill from '@/features/shop/components/CategoryPill'
import OfferCard from '@/features/shop/components/OfferCard'
import ProductCard from '@/features/shop/components/ProductCard'

type User = { name: string; avatar?: string }
type Category = { id: string; label: string; icon: any }
type Product = {
  id: string
  title: string
  price: number
  rating: number
  reviews: number
  image?: any
}

export default function HomeScreen({
  user,
  categories,
  filters,
  products,
  onSeeAllSpecial,
  onSeeAllPopular,
  onOpenProduct,
}: {
  user: User
  categories: Category[]
  filters: string[]
  products: Product[]
  onSeeAllSpecial: () => void
  onSeeAllPopular: () => void
  onOpenProduct: (id: string) => void
}) {
  const { theme: t } = useTheme()
  const [activeFilter, setActiveFilter] = React.useState(filters[0])

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: t.colors.bg }]} edges={['top']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting + quick actions */}
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          <View style={[styles.rowBetween, { marginBottom: 12 }]}>
            <View>
              <Text style={{ color: t.colors.textSecondary, fontSize: 12 }}>Good Morning 👋</Text>
              <Text
                style={{
                  color: t.colors.text,
                  fontSize: 18,
                  fontWeight: '700',
                }}
              >
                {user.name}
              </Text>
            </View>
            <View style={[styles.row, { gap: 16 }]}>
              <Pressable hitSlop={8}>
                <Feather name="heart" size={20} color={t.colors.text} />
              </Pressable>
              <Pressable hitSlop={8}>
                <Feather name="bell" size={20} color={t.colors.text} />
              </Pressable>
            </View>
          </View>

          <SearchBar
            placeholder="Search"
            rightIcon={<Feather name="sliders" size={18} color={t.colors.text} />}
          />
        </View>

        {/* Special Offers */}
        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <SectionHeader title="Special Offers" onSeeAll={onSeeAllSpecial} />
          <OfferCard
            title="30%"
            subtitle="Today's Special"
            description="Get discount for every order, only valid for today."
            image={require('../assets/images/macair.png')}
          />
        </View>

        {/* Categories (grid of circular icons + labels) */}
        <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
          <FlatList
            data={categories}
            keyExtractor={(c) => c.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            renderItem={({ item }) => <CategoryPill label={item.label} iconName={item.icon} />}
          />
        </View>

        {/* Most Popular */}
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <SectionHeader title="Most Popular" onSeeAll={onSeeAllPopular} />
          {/* filter chips */}
          <FlatList
            data={filters}
            keyExtractor={(f) => f}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            contentContainerStyle={{ paddingVertical: 8 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setActiveFilter(item)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: activeFilter === item ? t.colors.text : t.colors.card,
                  },
                ]}
              >
                <Text
                  style={{
                    color: activeFilter === item ? (t.dark ? t.colors.bg : '#fff') : t.colors.text,
                    fontWeight: '600',
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />

          {/* product grid (2 columns) */}
          <View style={styles.grid}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onPress={() => onOpenProduct(p.id)} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
})
