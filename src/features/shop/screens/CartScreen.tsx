import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/shared/hooks/useTheme'
import { Search, Trash2, Minus, Plus, ArrowRight } from 'lucide-react-native'

type CartItem = {
  id: string
  title: string
  price: number
  qty: number
  attrs?: string // e.g. "Color | Size = M"
  image: any
}

// simple currency fmt (swap if you have a util)
const money = (n: number) =>
  `$${n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

export default function CartScreen() {
  const { theme: t } = useTheme()

  const [items, setItems] = React.useState<CartItem[]>([
    {
      id: '1',
      title: 'Werolla Cardigans',
      price: 385,
      qty: 1,
      attrs: 'Color  •  Size = M',
      image: {
        uri: 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?w=800&q=80',
      },
    },
    {
      id: '2',
      title: 'Suga Leather Shoes',
      price: 375,
      qty: 1,
      attrs: 'Color  •  Size = 40',
      image: {
        uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      },
    },
    {
      id: '3',
      title: 'Vinia Headphone',
      price: 360,
      qty: 1,
      attrs: 'Color',
      image: {
        uri: 'https://images.unsplash.com/photo-1518441902110-d846f5d0f765?w=800&q=80',
      },
    },
  ])

  const setQty = (id: string, next: number) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, next) } : it)))

  const inc = (id: string) => {
    const it = items.find((x) => x.id === id)
    if (it) setQty(id, it.qty + 1)
  }
  const dec = (id: string) => {
    const it = items.find((x) => x.id === id)
    if (it) setQty(id, it.qty - 1)
  }

  const removeItem = (id: string) => setItems((prev) => prev.filter((x) => x.id !== id))

  const total = items.reduce((s, x) => s + x.price * x.qty, 0)

  const tStyle = {
    bg: { backgroundColor: t.colors.bg },
    card: { backgroundColor: t.colors.card },
    text: { color: t.colors.text },
    sub: { color: t.colors.textSecondary },
    border: { borderColor: t.colors.border },
    primary: { backgroundColor: t.colors.primary, color: t.colors.onPrimary },
  }

  return (
    <SafeAreaView style={[styles.safe, tStyle.bg]}>
      {/* header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, tStyle.text]}>My Cart</Text>
        <Pressable hitSlop={8}>
          <Search size={20} color={t.colors.text} />
        </Pressable>
      </View>

      {/* list */}
      <ScrollView
        contentContainerStyle={[styles.list, { paddingBottom: 140 }]} // padding for sticky footer
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <View key={item.id} style={[styles.card, tStyle.card]}>
            <Image source={item.image} style={styles.image} />

            <View style={styles.info}>
              <View style={styles.infoRow}>
                <Text style={[styles.title, tStyle.text]} numberOfLines={1}>
                  {item.title}
                </Text>

                <Pressable onPress={() => removeItem(item.id)} hitSlop={8}>
                  <Trash2 size={18} color={t.colors.textSecondary} />
                </Pressable>
              </View>

              {item.attrs ? <Text style={[styles.attrs, tStyle.sub]}>{item.attrs}</Text> : null}

              <View style={styles.bottomRow}>
                <Text style={[styles.price, tStyle.text]}>{money(item.price)}</Text>

                <View style={[styles.stepper, tStyle.card, { borderColor: t.colors.border }]}>
                  <TouchableOpacity
                    onPress={() => dec(item.id)}
                    style={styles.stepBtn}
                    activeOpacity={0.7}
                  >
                    <Minus size={14} color={t.colors.textSecondary} />
                  </TouchableOpacity>

                  <Text style={[styles.qty, tStyle.text]}>{item.qty}</Text>

                  <TouchableOpacity
                    onPress={() => inc(item.id)}
                    style={styles.stepBtn}
                    activeOpacity={0.7}
                  >
                    <Plus size={14} color={t.colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* sticky checkout bar */}
      <View style={[styles.footerWrap, tStyle.bg]}>
        <View style={[styles.footer, tStyle.card, { borderColor: t.colors.border }]}>
          <View style={styles.totalCol}>
            <Text style={[styles.totalLabel, tStyle.sub]}>Total price</Text>
            <Text style={[styles.total, tStyle.text]}>{money(total)}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.checkoutBtn, { backgroundColor: t.colors.text }]}
            onPress={() => {
              // TODO: navigate to checkout flow
              // router.push("/checkout");
            }}
          >
            <Text style={[styles.checkoutText, { color: t.colors.bg }]}>Checkout</Text>
            <ArrowRight size={16} color={t.colors.bg} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '800' },

  list: { paddingHorizontal: 16, paddingTop: 8, rowGap: 14 },

  card: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: 74,
    height: 74,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#0001',
  },

  info: { flex: 1 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: { fontSize: 16, fontWeight: '700' },
  attrs: { marginTop: 4, fontSize: 12 },

  bottomRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  price: { fontSize: 16, fontWeight: '800' },

  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 6,
    paddingVertical: 6,
    gap: 10,
    minWidth: 92,
    justifyContent: 'space-between',
  },
  stepBtn: { paddingHorizontal: 6, paddingVertical: 4 },
  qty: { fontSize: 14, fontWeight: '700', minWidth: 18, textAlign: 'center' },

  footerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0, // tab bar has safe-area padding; this sits above it
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
    // subtle shadow
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 },
    elevation: 3,
  },
  totalCol: { gap: 2 },
  totalLabel: { fontSize: 12, fontWeight: '600' },
  total: { fontSize: 22, fontWeight: '900' },

  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  checkoutText: { fontSize: 15, fontWeight: '800' },
})
