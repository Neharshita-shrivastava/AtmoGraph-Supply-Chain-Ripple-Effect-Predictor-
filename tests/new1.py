import networkx as nx

class AtmoGraph:

    def __init__(self):
        self.graph = nx.DiGraph()

    def build_network(self):
        self.graph.add_edges_from([
            ("Supplier A", "Factory 1"),
            ("Supplier B", "Factory 1"),
            ("Supplier C", "Factory 2"),
            ("Factory 1", "Warehouse 1"),
            ("Factory 2", "Warehouse 2"),
            ("Warehouse 1", "Retailer 1"),
            ("Warehouse 2", "Retailer 2"),
            ("Retailer 1", "Customer"),
            ("Retailer 2", "Customer")
        ])

    def predict_disruption(self, supplier):

        if supplier not in self.graph:
            print("Supplier not found!")
            return

        affected_nodes = nx.descendants(self.graph, supplier)

        print("\n AT MOGRAPH DISRUPTION REPORT")
        print("-" * 40)

        print(f"Failed Supplier: {supplier}")
        print(f"Total Affected Nodes: {len(affected_nodes)}")

        if affected_nodes:
            print("\nAffected Supply Chain:")
            for node in affected_nodes:
                print(f" - {node}")
        else:
            print("No downstream impact detected.")

        impact = len(affected_nodes) / (len(self.graph.nodes) - 1) * 100

        print(f"\nDisruption Impact: {impact:.2f}%")

        if impact > 60:
            print("Risk Level: CRITICAL")
        elif impact > 30:
            print("Risk Level: HIGH")
        elif impact > 0:
            print("Risk Level: MODERATE")
        else:
            print("Risk Level: LOW")


if __name__ == "__main__":

    app = AtmoGraph()

    app.build_network()

    print("AT MOGRAPH - SUPPLY CHAIN INTELLIGENCE")
    print("--------------------------------------")

    supplier = input("Enter supplier name (Supplier A/B/C): ")

    app.predict_disruption(supplier)